import { useInView } from '../hooks/useInView';

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...props }) {
  const [ref, visible] = useInView({ threshold: 0.15 });
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
