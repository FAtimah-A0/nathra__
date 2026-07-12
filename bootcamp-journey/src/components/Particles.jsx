import { useMemo } from 'react';

export default function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${8 + Math.random() * 14}s`,
        delay: `${Math.random() * 10}s`,
        size: `${2 + Math.random() * 3}px`,
      })),
    [],
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
