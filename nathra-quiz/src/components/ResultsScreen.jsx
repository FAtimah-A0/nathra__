import { useEffect, useRef, useState } from 'react';
import { getResultKey, getRingColor, RESULTS } from '../data/quizData';
import { submitLead } from '../services/submitLead';

const RING_CIRCUMFERENCE = 376.99;

export default function ResultsScreen({ score, total, level, topic, onGoHome, onRetryQuiz }) {
  const ringRef = useRef(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const pct = score / total;
  const resultKey = getResultKey(pct);
  const result = RESULTS[resultKey];
  const showLeadBox = resultKey === 'low';

  const badges = [
    { label: '⚡ سرعة التفكير', earned: true },
    { label: '🎯 دقة الإجابة', earned: score >= 4 },
    { label: '🏆 إجابات مثالية', earned: score === 5 },
    { label: '📚 معرفة متقدمة', earned: level === 'advanced' && score >= 3 },
  ];

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    ring.style.stroke = getRingColor(pct);
    ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE);

    const timer = setTimeout(() => {
      ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE - RING_CIRCUMFERENCE * pct);
    }, 100);

    return () => clearTimeout(timer);
  }, [pct]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName || !trimmedPhone) {
      alert('من فضلك أدخل الاسم ورقم الجوال.');
      return;
    }

    setSubmitting(true);
    try {
      await submitLead({
        name: trimmedName,
        phone: trimmedPhone,
        topic,
        level,
        score,
        total,
      });
      setLeadSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="section">
      <div className="logo-wrap">
        <img className="logo" src="/logo.png" alt="نثرة" />
      </div>
      <div className="score-ring">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle className="ring-bg" cx="70" cy="70" r="60" />
          <circle
            ref={ringRef}
            className="ring-fill"
            cx="70"
            cy="70"
            r="60"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE}
          />
        </svg>
        <div className="score-center">
          <span className="score-num">
            {score}/{total}
          </span>
          <span className="score-label">نقاط</span>
        </div>
      </div>
      <div className="result-level" style={{ color: result.color }}>
        {result.label}
      </div>
      <div className="result-msg">{result.msg}</div>
      <div className="badges">
        {badges.map((badge) => (
          <span key={badge.label} className={`badge ${badge.earned ? 'earned' : 'locked'}`}>
            {badge.label}
          </span>
        ))}
      </div>
      {showLeadBox && (
        <div className="lead-box">
          <h3>🎯 نريد مساعدتك في التطور!</h3>
          <p>
            يبدو أن هناك مجالاً للتحسين — دوراتنا التدريبية ستنقلك لمستوى أعلى. أدخل بياناتك وسيتواصل معك
            فريق نثرة.
          </p>
          {leadSubmitted ? (
            <div className="success-msg">
              ✅ تم إرسال بياناتك بنجاح! سيتواصل معك فريق نثرة قريباً.
            </div>
          ) : (
            <form className="lead-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="رقم الجوال"
              />
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'جارٍ الإرسال...' : 'أرسل بياناتي 🚀'}
              </button>
            </form>
          )}
        </div>
      )}
      <div className="results-actions">
        <button type="button" className="next-btn" onClick={onGoHome}>
          اختبار آخر
        </button>
        <button type="button" className="restart-btn" onClick={onRetryQuiz}>
          أعد المحاولة 🔄
        </button>
      </div>
    </div>
  );
}
