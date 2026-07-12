import { HERO, URGENCY } from '../data/bootcampData';
import Reveal from './Reveal';
import RegisterWhatsApp from './RegisterWhatsApp';

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow" aria-hidden="true" />

      <Reveal className="hero-eyebrow">{HERO.eyebrow}</Reveal>

      <Reveal delay={0.05}>
        <h1 className="hero-title">
          {HERO.title}
          <span className="hero-accent">{HERO.titleAccent}</span>
        </h1>
      </Reveal>

      <Reveal className="hero-subtitle" delay={0.1}>
        <p>{HERO.subtitle}</p>
      </Reveal>

      <Reveal className="urgency-row" delay={0.15}>
        {URGENCY.map((item) => (
          <span key={item.text} className="urgency-pill">
            {item.icon} {item.text}
          </span>
        ))}
      </Reveal>

      <Reveal className="hero-actions" delay={0.2}>
        <RegisterWhatsApp className="register-form-hero" />
        <a href="#journey" className="btn-ghost">
          {HERO.ctaSecondary}
        </a>
      </Reveal>

      <Reveal className="hero-meta" delay={0.25}>
        {HERO.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </Reveal>
    </section>
  );
}
