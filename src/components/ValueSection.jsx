import { useEffect, useState } from 'react';
import { VALUE_PROPS } from '../data/bootcampData';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';

const AUTO_PLAY_MS = 4000;

export default function ValueSection() {
  const [ref, visible] = useInView({ threshold: 0.25 });
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const item = VALUE_PROPS.items[active];

  useEffect(() => {
    if (!visible || !autoPlay) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % VALUE_PROPS.items.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [visible, autoPlay]);

  const selectItem = (index) => {
    setActive(index);
    setAutoPlay(false);
  };

  return (
    <section className="section section-value" id="why">
      <Reveal>
        <span className="section-label">✨ القيمة</span>
        <h2 className="section-title">{VALUE_PROPS.title}</h2>
        <p className="section-sub">{VALUE_PROPS.subtitle}</p>
      </Reveal>

      <div ref={ref} className={`value-showcase${visible ? ' is-visible' : ''}`}>
        <div className="value-panel" aria-live="polite">
          <div className="value-panel-glow" aria-hidden="true" />
          <span className="value-panel-step">{String(active + 1).padStart(2, '0')}</span>
          <span key={`icon-${active}`} className="value-panel-icon">{item.icon}</span>
          <h3 key={`title-${active}`} className="value-panel-title">{item.title}</h3>
          <p key={`desc-${active}`} className="value-panel-desc">{item.desc}</p>

          <div className="value-progress">
            {VALUE_PROPS.items.map((entry, index) => (
              <button
                key={entry.title}
                type="button"
                className={`value-progress-dot${index === active ? ' active' : ''}${index < active ? ' done' : ''}`}
                aria-label={entry.title}
                onClick={() => selectItem(index)}
              />
            ))}
          </div>
        </div>

        <div className="value-tabs" role="tablist" aria-label="مزايا المعسكر">
          {VALUE_PROPS.items.map((entry, index) => (
            <button
              key={entry.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`value-tab${index === active ? ' active' : ''}`}
              onClick={() => selectItem(index)}
            >
              <span className="value-tab-icon">{entry.icon}</span>
              <span className="value-tab-copy">
                <strong>{entry.title}</strong>
                <small>{entry.desc}</small>
              </span>
              <span className="value-tab-arrow" aria-hidden="true">←</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
