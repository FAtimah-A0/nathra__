import { useInView } from '../hooks/useInView';
import { META, ROADMAP } from '../data/bootcampData';
import Reveal from './Reveal';
import ProgramIcon from './ProgramIcon';

const TILTS = ['card-tilt-1', 'card-tilt-2', 'card-tilt-3', 'card-tilt-4'];

function JourneyMarker({ children, delay = 0 }) {
  const [ref, visible] = useInView({ threshold: 0.35 });

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

function TreasureFooter() {
  const [ref, visible] = useInView({ threshold: 0.35 });

  return (
    <div ref={ref} className={`treasure-footer${visible ? ' visible' : ''}`}>
      <div className="treasure-title">🏆 الكنز: ملف أعمال</div>
      <div className="treasure-sub">مشاريع عملية · تدريب مباشر · أسبوع لكل مدرب</div>
    </div>
  );
}

function FifaCard({ step, index }) {
  const [ref, visible] = useInView({
    threshold: 0.28,
    rootMargin: '0px 0px -8% 0px',
  });
  const order = String(step.week).padStart(2, '0');
  const isTreasure = step.tier === 'tier-special';

  return (
    <article
      ref={ref}
      className={`fifa-card ${step.tier} ${TILTS[index] || ''}${isTreasure ? ' is-treasure' : ''}${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s`, zIndex: index + 1 }}
    >
      <div className="card-bg" aria-hidden="true" />
      <div className="card-inner">
        <div className="card-top">
          <div className="card-rating">{order}</div>
          <div className="card-pos">
            <span className="icon">
              <ProgramIcon src={step.icon} alt={step.module} size={34} />
            </span>
          </div>
        </div>

        <div className="card-photo">
          <div className="card-module-badge">
            <div className="card-landmark">{step.landmark}</div>
            <div className="card-module">{step.module}</div>
            <div className="card-week">{step.duration}</div>
          </div>
        </div>

        <div className="card-stats">
          <div className="stat-row">
            <span className="stat-label">التواريخ</span>
            <span className="stat-value">{step.dates}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">المحطة</span>
            <span className="stat-value">{order}</span>
          </div>
        </div>

        <div className="card-skills">{step.desc}</div>
      </div>
    </article>
  );
}

export default function RoadmapSection() {
  return (
    <section className="section section-journey" id="journey">
      <Reveal>
        <span className="section-label">🗺️ مسار التعلم</span>
        <h2 className="section-title">بطاقات رحلة المعسكر</h2>
        <p className="section-sub">
          توزيع بطاقات المسار — أسبوع لكل محطة حتى الكنز
        </p>
      </Reveal>

      <div className="journey-wrap">
        <JourneyMarker delay={0}>🏁 نقطة الانطلاق · {META.startDate}</JourneyMarker>

        <div className="cards-stage">
          {ROADMAP.map((step, index) => (
            <FifaCard key={step.week} step={step} index={index} />
          ))}
        </div>

        <TreasureFooter />
      </div>
    </section>
  );
}
