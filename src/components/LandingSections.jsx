import {
  OUTCOMES,
  SCHEDULE,
  TRAINERS,
  PRICING,
  WHATSAPP_URL,
  QR_URL,
  META,
} from '../data/bootcampData';
import Reveal from './Reveal';
import ProgramIcon from './ProgramIcon';
import RegisterWhatsApp from './RegisterWhatsApp';

export function ScheduleSection() {
  return (
    <section className="section" id="schedule">
      <Reveal>
        <span className="section-label">📋 الجدول</span>
        <h2 className="section-title">جدول محطات المعسكر</h2>
        <p className="section-sub">
          {META.dateRange} · تدريب مسائي {META.time} · أسبوع واحد لكل مدرب
        </p>
      </Reveal>

      <Reveal className="schedule-table-wrap">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>#</th>
              <th>المحطة</th>
              <th>المحتوى</th>
              <th>المدرب</th>
              <th>المدة</th>
              <th>من</th>
              <th>إلى</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((row) => (
              <tr key={row.order}>
                <td className="num">{row.order}</td>
                <td className="landmark">{row.station}</td>
                <td>
                  <div className="program-cell">
                    <ProgramIcon src={row.icon} alt={row.module} />
                    <span>{row.module}</span>
                  </div>
                </td>
                <td>{row.trainer}</td>
                <td>{row.duration}</td>
                <td className="dates">{row.from}</td>
                <td className="dates">{row.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}

export function OutcomesSection() {
  return (
    <section className="section" id="outcomes">
      <Reveal>
        <span className="section-label">🎯 مخرجات التعلم</span>
        <h2 className="section-title">بعد إتمام المعسكر ستكون قادرًا على</h2>
      </Reveal>
      <div className="outcomes-grid">
        {OUTCOMES.map((text, i) => (
          <Reveal key={text} className="outcome-card" delay={i * 0.08}>
            <span className="outcome-check">✔</span>
            <span>{text}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TrainersSection() {
  return (
    <section className="section section-trainers" id="trainers">
      <Reveal>
        <span className="section-label">👥 المدربون</span>
        <h2 className="section-title">تعلّم من خبراء في كل محطة</h2>
        <p className="section-sub">خبرة عملية مباشرة — اسم المدرب وخبراته في كل بطاقة</p>
      </Reveal>
      <div className="trainers-row">
        {TRAINERS.map((t, i) => (
          <Reveal key={t.name} className="trainer-pill" delay={i * 0.08}>
            <div className="trainer-pill-icon">
              <ProgramIcon src={t.icon} alt={t.name} size={32} />
            </div>
            <strong className="trainer-pill-name">{t.name}</strong>
            <ul className="trainer-experience">
              {t.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className="section" id="pricing">
      <Reveal>
        <span className="section-label">💰 الاستثمار</span>
        <h2 className="section-title">استثمر في مستقبلك المهني</h2>
        <p className="section-sub">عرض محدود للمسجلين في أغسطس 2026</p>
      </Reveal>

      <Reveal className="pricing-funnel">
        <div className="pricing-step">
          <span className="pricing-step-label">السعر الأصلي</span>
          <span className="pricing-old">{PRICING.oldPrice} {PRICING.currency}</span>
        </div>
        <div className="pricing-arrow">↓</div>
        <div className="pricing-step pricing-discount">
          <span className="pricing-step-label">الخصم</span>
          <span className="pricing-discount-tag">{PRICING.discount}</span>
        </div>
        <div className="pricing-arrow">↓</div>
        <div className="pricing-step pricing-current">
          <span className="pricing-step-label">السعر الحالي</span>
          <span className="pricing-new">
            {PRICING.newPrice} <small>{PRICING.currency}</small>
          </span>
        </div>
        <div className="pricing-arrow">↓</div>
        <div className="pricing-step">
          <span className="pricing-step-label">الدفع</span>
          <span className="pricing-installment">{PRICING.installment}</span>
        </div>

        <ul className="pricing-includes">
          {PRICING.includes.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="section final-cta" id="register">
      <Reveal className="final-cta-box">
        <span className="limited-badge">🔥 مقاعد محدودة</span>
        <h2>جاهز تبدأ رحلتك؟</h2>
        <p>اكتب اسمك وسجّل معنا عبر واتساب — فريق Nathra يرد عليك خلال ساعات</p>

        <div className="final-cta-grid">
          <div className="qr-block">
            <img src={QR_URL} alt="QR للتسجيل عبر واتساب" width={180} height={180} />
            <span>امسح للتسجيل</span>
          </div>
          <div className="final-cta-actions">
            <RegisterWhatsApp size="btn-xl" withName />
            <a href={WHATSAPP_URL} className="btn-whatsapp" target="_blank" rel="noreferrer">
              💬 واتساب: {PRICING.phone}
            </a>
            <p className="final-cta-note">⏳ التسجيل ينتهي قريبًا · 🎥 تدريب مباشر أونلاين</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <span>{META.brand}</span>
      <span>{META.tagline}</span>
      <a href={`tel:${PRICING.phone}`}>{PRICING.phone}</a>
    </footer>
  );
}
