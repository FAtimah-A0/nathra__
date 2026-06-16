export default function WelcomeScreen({ topic, onSelectTopic, onStartQuiz }) {
  return (
    <div className="section">
      <div className="logo-wrap">
        <img className="logo" src="/logo.png" alt="نثرة" />
      </div>
      <p className="tagline">من نثر البيانات... تصنع المعنى</p>
      <h1>اختبار المهارات التقنية</h1>
      <p className="subtitle">اكتشف مستواك في Google Sheets و Google Drive</p>
      <p className="level-title">اختر الموضوع أولاً</p>
      <div className="topics">
        <button
          type="button"
          className={`topic-btn${topic === 'sheets' ? ' active' : ''}`}
          onClick={() => onSelectTopic('sheets')}
        >
          📊 Google Sheets
        </button>
        <button
          type="button"
          className={`topic-btn${topic === 'drive' ? ' active' : ''}`}
          onClick={() => onSelectTopic('drive')}
        >
          ☁️ Google Drive
        </button>
      </div>
      <p className="level-title" style={{ marginTop: 28 }}>
        اختر مستواك
      </p>
      <div className="levels">
        <button type="button" className="level-btn beginner" onClick={() => onStartQuiz('beginner')}>
          <span className="level-icon">🌱</span>
          <span>مبتدئ</span>
          <span className="level-desc">أساسيات واجهة الاستخدام</span>
        </button>
        <button type="button" className="level-btn intermediate" onClick={() => onStartQuiz('intermediate')}>
          <span className="level-icon">⚡</span>
          <span>متوسط</span>
          <span className="level-desc">الدوال والتنظيم</span>
        </button>
        <button type="button" className="level-btn advanced" onClick={() => onStartQuiz('advanced')}>
          <span className="level-icon">🔥</span>
          <span>محترف</span>
          <span className="level-desc">ميزات متقدمة</span>
        </button>
      </div>
    </div>
  );
}
