import { VALUE_PROPS } from '../data/bootcampData';
import Reveal from './Reveal';

export default function ValueSection() {
  return (
    <section className="section" id="why">
      <Reveal>
        <span className="section-label">✨ القيمة</span>
        <h2 className="section-title">{VALUE_PROPS.title}</h2>
        <p className="section-sub">{VALUE_PROPS.subtitle}</p>
      </Reveal>

      <div className="value-grid">
        {VALUE_PROPS.items.map((item, i) => (
          <Reveal key={item.title} className="value-card" delay={i * 0.08}>
            <span className="value-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
