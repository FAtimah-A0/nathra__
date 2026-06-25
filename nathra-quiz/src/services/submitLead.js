import emailjs from '@emailjs/browser';

let initialized = false;

const PLACEHOLDERS = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  sheetUrl: 'YOUR_SCRIPT_ID_HERE',
  formAction: 'YOUR_FORM_ID',
};

function initEmailJs() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!initialized && publicKey && publicKey !== PLACEHOLDERS.publicKey) {
    emailjs.init({ publicKey });
    initialized = true;
  }
}

function isFormConfigured() {
  const action = import.meta.env.VITE_GOOGLE_FORM_ACTION;
  const nameEntry = import.meta.env.VITE_FORM_ENTRY_NAME;
  const phoneEntry = import.meta.env.VITE_FORM_ENTRY_PHONE;
  return Boolean(
    action &&
    !action.includes(PLACEHOLDERS.formAction) &&
    nameEntry &&
    phoneEntry,
  );
}

function isSheetConfigured() {
  const sheetUrl = import.meta.env.VITE_SHEET_URL;
  return Boolean(sheetUrl && !sheetUrl.includes(PLACEHOLDERS.sheetUrl));
}

function isEmailConfigured() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  return (
    Boolean(publicKey && publicKey !== PLACEHOLDERS.publicKey) &&
    Boolean(serviceId && serviceId !== PLACEHOLDERS.serviceId) &&
    Boolean(templateId && templateId !== PLACEHOLDERS.templateId)
  );
}

function getSetupError() {
  if (isFormConfigured() || isSheetConfigured() || isEmailConfigured()) return '';

  return [
    'لم يُفعّل الحفظ بعد.',
    '',
    'لا يمكن إنشاء Google Sheet من طرفنا — يجب ربط حساب Google الخاص بك.',
    '',
    'أسهل طريقة (دقيقتان):',
    'http://localhost:5173/setup-google-sheet.html',
    '',
    'أنشئ Google Form → اربطه بجدولك → أرسل رابط النموذج',
    'ونضيف الإعدادات في .env',
  ].join('\n');
}

async function saveToGoogleForm(payload) {
  const action = import.meta.env.VITE_GOOGLE_FORM_ACTION;
  const formData = new FormData();

  formData.append(import.meta.env.VITE_FORM_ENTRY_NAME, payload.name);
  formData.append(import.meta.env.VITE_FORM_ENTRY_PHONE, payload.phone);

  const levelEntry = import.meta.env.VITE_FORM_ENTRY_LEVEL;
  const topicEntry = import.meta.env.VITE_FORM_ENTRY_TOPIC;
  const scoreEntry = import.meta.env.VITE_FORM_ENTRY_SCORE;
  const timeEntry = import.meta.env.VITE_FORM_ENTRY_TIME;

  if (levelEntry) formData.append(levelEntry, payload.level);
  if (topicEntry) formData.append(topicEntry, payload.topic);
  if (scoreEntry) formData.append(scoreEntry, payload.score);
  if (timeEntry) formData.append(timeEntry, payload.timestamp);

  await fetch(action, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });
}

async function saveToGoogleSheet(payload) {
  const sheetUrl = import.meta.env.VITE_SHEET_URL;
  const params = new URLSearchParams(payload);

  await fetch(`${sheetUrl}?${params.toString()}`, {
    method: 'GET',
    mode: 'no-cors',
  });
}

async function sendEmailNotification(payload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const toEmail = import.meta.env.VITE_NOTIFY_EMAIL || 'info@nathrahdata.com';

  await emailjs.send(serviceId, templateId, {
    to_email: toEmail,
    from_name: 'نظام اختبار نثرة',
    client_name: payload.name,
    client_phone: payload.phone,
    quiz_topic: payload.topicLabel,
    quiz_level: payload.levelLabel,
    quiz_score: payload.scoreText,
    submit_time: payload.timestamp,
    message: `عميل جديد: ${payload.name} — ${payload.phone}`,
  });
}

export async function submitLead({ name, phone, topic, level, score, total }) {
  const formConfigured = isFormConfigured();
  const sheetConfigured = isSheetConfigured();
  const emailConfigured = isEmailConfigured();

  if (!formConfigured && !sheetConfigured && !emailConfigured) {
    throw new Error(getSetupError());
  }

  initEmailJs();

  const levelLabels = { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'محترف' };
  const topicLabels = { sheets: 'Google Sheets', drive: 'Google Drive' };
  const timestamp = new Date().toLocaleString('ar-SA');
  const scoreText = `${score}/${total}`;

  const payload = {
    name,
    phone,
    level: levelLabels[level] || level,
    topic: topicLabels[topic] || topic,
    score: scoreText,
    timestamp,
    levelLabel: levelLabels[level] || level,
    topicLabel: topicLabels[topic] || topic,
    scoreText,
  };

  let saved = false;
  let emailSent = false;

  if (formConfigured) {
    try {
      await saveToGoogleForm(payload);
      saved = true;
    } catch (err) {
      console.warn('Google Form error:', err);
    }
  }

  if (!saved && sheetConfigured) {
    try {
      await saveToGoogleSheet({
        name: payload.name,
        phone: payload.phone,
        level: payload.level,
        topic: payload.topic,
        score: payload.score,
        timestamp: payload.timestamp,
      });
      saved = true;
    } catch (err) {
      console.warn('Google Sheets error:', err);
    }
  }

  if (emailConfigured) {
    try {
      await sendEmailNotification(payload);
      emailSent = true;
    } catch (err) {
      console.warn('EmailJS error:', err);
    }
  }

  if (!saved && !emailSent) {
    throw new Error('تعذّر حفظ البيانات. تحقق من إعدادات Google Form أو .env');
  }

  return { saved, emailSent };
}
