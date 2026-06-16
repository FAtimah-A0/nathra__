import emailjs from '@emailjs/browser';

let initialized = false;

function initEmailJs() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!initialized && publicKey && publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init({ publicKey });
    initialized = true;
  }
}

export async function submitLead({ name, phone, topic, level, score, total }) {
  initEmailJs();

  const levelLabels = { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'محترف' };
  const topicLabels = { sheets: 'Google Sheets', drive: 'Google Drive' };
  const timestamp = new Date().toLocaleString('ar-SA');
  const scoreText = `${score}/${total}`;

  const sheetUrl = import.meta.env.VITE_SHEET_URL;
  if (sheetUrl && !sheetUrl.includes('YOUR_SCRIPT_ID_HERE')) {
    try {
      const params = new URLSearchParams({
        name,
        phone,
        level,
        topic,
        score: scoreText,
        timestamp,
      });
      await fetch(`${sheetUrl}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });
    } catch {
      // optional integration
    }
  }

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (serviceId && templateId && serviceId !== 'YOUR_SERVICE_ID') {
    try {
      await emailjs.send(serviceId, templateId, {
        to_email: 'info@nathrahdata.com',
        from_name: 'نظام اختبار نثرة',
        client_name: name,
        client_phone: phone,
        quiz_topic: topicLabels[topic] || topic,
        quiz_level: levelLabels[level] || level,
        quiz_score: scoreText,
        submit_time: timestamp,
      });
    } catch (err) {
      console.warn('EmailJS error:', err);
    }
  }
}
