import { useEffect, useMemo, useState } from 'react';
import { NAV_LINKS } from '../data/bootcampData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const handleNav = () => setOpen(false);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-brand" onClick={handleNav}>
        <img src={`${import.meta.env.BASE_URL}logo-transparent.png`} alt="Nathra" />
      </a>
      <button type="button" className="nav-toggle" aria-label="القائمة" onClick={() => setOpen((v) => !v)}>
        ☰
      </button>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={link.href ?? `#${link.id}`}
              className={`${link.cta ? 'nav-cta ' : ''}${active === link.id ? 'active' : ''}`}
              onClick={handleNav}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
