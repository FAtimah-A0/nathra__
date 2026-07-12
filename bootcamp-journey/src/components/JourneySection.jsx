import { useInView } from '../hooks/useInView';
import { STATIONS, META } from '../data/bootcampData';

function Connector({ delay }) {
  const [ref, visible] = useInView({ threshold: 0.5 });
  return (
    <div
      ref={ref}
      className={`h-connector${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    />
  );
}

function HorizontalCard({ station, delay }) {
  const [ref, visible] = useInView({ threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
  const order = String(station.order).padStart(2, '0');

  return (
    <article
      ref={ref}
      className={`h-card ${station.tier}${station.treasure ? ' is-treasure' : ''}${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="h-badge">محطة {order}</span>
      <div className="h-card-bg" />
      <div className="h-card-inner">
        <div className="h-num">{order}</div>
        <div className="h-icon">{station.icon}</div>
        <div className="h-body">
          <div className="h-landmark">{station.landmark}</div>
          <div className="h-module">{station.module}</div>
          <div className="h-meta">
            <span>{station.duration}</span>
            <span className="dates">
              {station.dateFrom} → {station.dateTo}
            </span>
          </div>
        </div>
        <div className="h-side">
          <div className="h-skills">{station.skills}</div>
        </div>
      </div>
    </article>
  );
}

function JourneyMarker({ children, delay }) {
  const [ref, visible] = useInView({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      className={`journey-marker${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function JourneySection() {
  return (
    <section className="section" id="journey">
      <span className="section-label">🗺️ مسار الرحلة</span>
      <h2 className="section-title">اتبع المحطات خطوة بخطوة</h2>
      <p className="section-sub">كل محطة متصلة بالتي تليها — أسبوع واحد، مشروع واحد، مهارة جديدة.</p>

      <div className="cards-stack">
        <JourneyMarker delay={0}>🏁 نقطة الانطلاق · {META.startDate}</JourneyMarker>
        <Connector delay={0.05} />

        {STATIONS.map((station, index) => (
          <div key={station.order} className="stack-item">
            <HorizontalCard station={station} delay={index * 0.08 + 0.1} />
            {index < STATIONS.length - 1 && <Connector delay={index * 0.08 + 0.14} />}
          </div>
        ))}

        <Connector delay={0.42} />
        <JourneyMarker delay={0.5}>🎓 التخرج · شهادة + ملف أعمال</JourneyMarker>
      </div>
    </section>
  );
}
