import { useState } from 'react';
import { getWhatsAppUrl } from '../data/bootcampData';

export default function RegisterWhatsApp({ size = '', className = '' }) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    window.open(getWhatsAppUrl(trimmed), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className={`register-form${className ? ` ${className}` : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className="register-name-input"
        placeholder="الاسم الكامل"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        aria-label="الاسم الكامل"
      />
      <button type="submit" className={`btn-glow btn-primary${size ? ` ${size}` : ''}`}>
        سجّل معنا
      </button>
    </form>
  );
}
