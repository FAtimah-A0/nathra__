import { useInView } from '../hooks/useInView';
import { DESTINATIONS, OUTCOMES, SCHEDULE, TRAINERS, PRICING, META } from '../data/bootcampData';

export function DestinationSection() {
  const [ref, visible] = useInView({ threshold: 0.3 });

  return (
    <section className="section" id="destination">
      <div ref={ref} className={`destination${visible ? ' visible' : ''}`}>
        <span className="destination-icon">🏆</span>
        <h3>Destination — وجهة الرحلة</h3>
        <div className="destination-grid">
          {DESTINATIONS.map((d) => (
            <div key={d.label} className="dest-pill">
              <span className="emoji">{d.emoji}</span>
              {d.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeItem({ text, index }) {
  const [ref, visible] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`outcome-item${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className="outcome-check">✔</span>
      {text}
    </div>
  );
}

export function OutcomesSection() {
  return (
    <section className="section" id="outcomes">
      <span className="section-label">🎯 مخرجات التعلم</span>
      <h2 className="section-title">بعد إتمام المعسكر ستكون قادرًا على</h2>
      <div className="outcomes-grid">
        {OUTCOMES.map((text, i) => (
          <OutcomeItem key={text} text={text} index={i} />
        ))}
      </div>
    </section>
  );
}

export function ScheduleSection() {
  const [ref, visible] = useInView({ threshold: 0.15 });

  return (
    <section className="section" id="schedule">
      <span className="section-label">📋 الجدول</span>
      <h2 className="section-title">جدول محطات المعسكر</h2>
      <p className="section-sub">
        {META.dateRange} · تدريب مسائي {META.time} · أسبوع واحد لكل مدرب
      </p>
      <div ref={ref} className={`schedule-table-wrap reveal${visible ? ' visible' : ''}`}>
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
                <td className="landmark">{row.landmark}</td>
                <td>{row.module}</td>
                <td>{row.trainer}</td>
                <td>{row.duration}</td>
                <td className="dates">{row.from}</td>
                <td className="dates">{row.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TrainerCard({ trainer, index }) {
  const [ref, visible] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`trainer-card${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="trainer-week">{trainer.week}</span>
      <div className="trainer-module">{trainer.module}</div>
      <div className="trainer-name">{trainer.name}</div>
      <div className="trainer-title">{trainer.title}</div>
    </div>
  );
}

export function TrainersSection() {
  return (
    <section className="section" id="trainers">
      <span className="section-label">👥 فريق التدريب</span>
      <h2 className="section-title">مدربون خبراء في كل محطة</h2>
      <p className="section-sub">أسبوع واحد مع كل مدرب — تركيز عميق وتطبيق عملي.</p>
      <div className="trainers-grid">
        {TRAINERS.map((trainer, i) => (
          <TrainerCard key={trainer.name} trainer={trainer} index={i} />
        ))}
      </div>
    </section>
  );
}

export function PricingSection() {
  const [ref, visible] = useInView({ threshold: 0.15 });

  return (
    <section className="section" id="pricing">
      <span className="section-label">💰 الاستثمار</span>
      <h2 className="section-title">سعر المعسكر</h2>
      <p className="section-sub">عرض تسجيل محدود — مقاعد محدودة للمسجلين مبكرًا.</p>
      <div ref={ref} className={`pricing-box reveal${visible ? ' visible' : ''}`}>
        <div className="price-card featured">
          <span className="price-tag">عرض</span>
          <div className="price-old">{PRICING.oldPrice}</div>
          <div className="price-new">
            {PRICING.newPrice} <small>{PRICING.currency}</small>
          </div>
          <p className="price-note">{PRICING.note}</p>
        </div>
        <a href={PRICING.whatsapp} className="register-card" id="register" target="_blank" rel="noreferrer">
          <h3>سجّل معنا</h3>
          <p>للتسجيل والاستفسار عبر واتساب</p>
          <span className="register-btn">تواصل معنا ←</span>
        </a>
      </div>
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
