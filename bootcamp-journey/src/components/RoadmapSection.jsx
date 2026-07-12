import { useInView } from '../hooks/useInView';
import { ROADMAP } from '../data/bootcampData';
import Reveal from './Reveal';
import ProgramIcon from './ProgramIcon';

function RoadmapStep({ step, index }) {
  const [ref, visible] = useInView({ threshold: 0.35 });

  return (
    <>
      <article
        ref={ref}
        className={`roadmap-step ${step.tier}${visible ? ' visible' : ''}`}
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="roadmap-week">{step.label}</div>
        <div className="roadmap-icon">
          <ProgramIcon src={step.icon} alt={step.module} size={36} />
        </div>
        <div className="roadmap-body">
          <span className="roadmap-station">{step.station}</span>
          <h3>{step.module}</h3>
          <p className="roadmap-desc">{step.desc}</p>
          <span className="roadmap-dates">{step.dates}</span>
        </div>
      </article>
      {index < ROADMAP.length - 1 && (
        <div className={`roadmap-connector${visible ? ' visible' : ''}`} aria-hidden="true">
          <span>↓</span>
        </div>
      )}
    </>
  );
}

export default function RoadmapSection() {
  return (
    <section className="section section-roadmap" id="journey">
      <Reveal>
        <span className="section-label">🗺️ مسار التعلم</span>
        <h2 className="section-title">رحلتك في 4 أسابيع</h2>
        <p className="section-sub">مسار واضح من Excel حتى تحليل البيانات بالذكاء الاصطناعي — أسبوع واحد لكل مهارة.</p>
      </Reveal>

      <div className="roadmap-track">
        {ROADMAP.map((step, i) => (
          <RoadmapStep key={step.week} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
