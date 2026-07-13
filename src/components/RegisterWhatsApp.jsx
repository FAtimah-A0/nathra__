import { useState } from 'react';
import { getWhatsAppUrl, WHATSAPP_URL } from '../data/bootcampData';

export default function RegisterWhatsApp({ size = '', className = '', withName = false }) {
  const [name, setName] = useState('');

  if (!withName) {
    return (
      <div className={`register-form${className ? ` ${className}` : ''}`}>
        <a
          href={WHATSAPP_URL}
          className={`btn-glow btn-primary${size ? ` ${size}` : ''}`}
          target="_blank"
          rel="noreferrer"
        >
          سجّل معنا
        </a>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    window.open(getWhatsAppUrl(trimmed), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      className={`register-form register-form-named${className ? ` ${className}` : ''}`}
      onSubmit={handleSubmit}
    >
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
