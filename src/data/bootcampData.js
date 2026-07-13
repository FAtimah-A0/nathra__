export const WHATSAPP_PHONE = '966504581123';

export const WHATSAPP_MESSAGE =
  'السلام عليكم، أرغب بالتسجيل في معسكر Nathra — تحليل البيانات والذكاء الاصطناعي.';

export function getWhatsAppUrl(name = '') {
  const trimmed = name.trim();
  const message = trimmed
    ? `${WHATSAPP_MESSAGE}\n\nالاسم: ${trimmed}`
    : WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = getWhatsAppUrl();
export const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(WHATSAPP_URL)}`;

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const PROGRAM_ICONS = {
  excel: asset('icons/excel-official.svg'),
  powerbi: asset('icons/power-bi.svg'),
  sql: asset('icons/postgresql.svg'),
  ml: asset('icons/tensorflow.svg'),
};

export const NAV_LINKS = [
  { id: 'journey', label: 'المسار' },
  { id: 'schedule', label: 'الجدول' },
  { id: 'pricing', label: 'الأسعار' },
  { id: 'register', label: 'سجّل معنا', cta: true },
];

export const URGENCY = [
  { icon: '🔥', text: 'مقاعد محدودة' },
  { icon: '🎥', text: 'تدريب مباشر أونلاين' },
];

export const HERO = {
  eyebrow: 'معسكر Nathra — أغسطس 2026',
  title: 'معسكر تحليل البيانات',
  titleAccent: 'والذكاء الاصطناعي',
  subtitle:
    'من الصفر إلى محلل بيانات جاهز للسوق — 4 أسابيع تدريب مباشر، مشاريع حقيقية، وملف أعمال يفتح لك أبواب التوظيف.',
  cta: 'سجّل معنا',
  ctaSecondary: 'استكشف المسار',
  meta: ['📅 1 – 31 أغسطس 2026', '🌙 8 – 10 مساءً', '⏱ 56 ساعة تدريب'],
};

export const VALUE_PROPS = {
  title: 'لماذا تنضم لهذا المعسكر؟',
  subtitle: 'ليس مجرد دورة — برنامج متكامل يبنيك خطوة بخطوة حتى تصبح جاهزًا للعمل.',
  items: [
    {
      icon: '🛠',
      title: 'مشاريع عملية',
      desc: '4 مشاريع تطبيقية تُضاف لملف أعمالك وتُظهر مهاراتك أمام أصحاب العمل.',
    },
    {
      icon: '📜',
      title: 'شهادة إتمام',
      desc: 'شهادة معتمدة من Nathra تثبت إكمالك لمسار تحليل البيانات والذكاء الاصطناعي.',
    },
    {
      icon: '💼',
      title: 'ملف أعمال احترافي',
      desc: 'Portfolio جاهز يعرض تحليلاتك، لوحاتك، استعلاماتك، ونماذج الذكاء الاصطناعي.',
    },
    {
      icon: '👨‍🏫',
      title: 'إرشاد مباشر',
      desc: 'مدربون خبراء — أسبوع كامل مع كل مدرب، دعم ومتابعة طوال الرحلة.',
    },
  ],
};

export const ROADMAP = [
  {
    week: 1,
    label: 'الأسبوع 1',
    landmark: 'جزيرة الجداول',
    module: 'Microsoft Excel',
    icon: PROGRAM_ICONS.excel,
    desc: 'Pivot · تقارير · تنظيف البيانات',
    duration: 'أسبوع واحد',
    dates: '1/8 → 7/8',
    tier: 'tier-bronze',
  },
  {
    week: 2,
    label: 'الأسبوع 2',
    landmark: 'خليج التصور',
    module: 'Power BI',
    icon: PROGRAM_ICONS.powerbi,
    desc: 'DAX · Dashboards · KPIs',
    duration: 'أسبوع واحد',
    dates: '8/8 → 14/8',
    tier: 'tier-silver',
  },
  {
    week: 3,
    label: 'الأسبوع 3',
    landmark: 'مغارة البيانات',
    module: 'SQL',
    icon: PROGRAM_ICONS.sql,
    desc: 'استعلامات · MySQL · هيكلة البيانات',
    duration: 'أسبوع واحد',
    dates: '15/8 → 21/8',
    tier: 'tier-gold',
  },
  {
    week: 4,
    label: 'الأسبوع 4',
    landmark: 'كنز الذكاء الاصطناعي',
    module: 'تحليل البيانات بالذكاء الاصطناعي',
    icon: PROGRAM_ICONS.ml,
    desc: 'نماذج · NLP · Computer Vision · Agentic AI',
    duration: 'أسبوع واحد',
    dates: '22/8 → 28/8',
    tier: 'tier-special',
  },
];

export const SCHEDULE = [
  {
    order: '01',
    station: 'الأسبوع 1 — تحليل الجداول',
    module: 'Microsoft Excel',
    icon: PROGRAM_ICONS.excel,
    trainer: 'فاطمة الحويطي',
    duration: 'أسبوع واحد',
    from: '1/8',
    to: '7/8',
  },
  {
    order: '02',
    station: 'الأسبوع 2 — تصور البيانات',
    module: 'Power BI',
    icon: PROGRAM_ICONS.powerbi,
    trainer: 'وليد عبدالعظيم',
    duration: 'أسبوع واحد',
    from: '8/8',
    to: '14/8',
  },
  {
    order: '03',
    station: 'الأسبوع 3 — قواعد البيانات',
    module: 'SQL',
    icon: PROGRAM_ICONS.sql,
    trainer: 'ياسمين البلوي',
    duration: 'أسبوع واحد',
    from: '15/8',
    to: '21/8',
  },
  {
    order: '04',
    station: 'الأسبوع 4 — تحليل البيانات بالذكاء الاصطناعي',
    module: 'تحليل البيانات بالذكاء الاصطناعي',
    icon: PROGRAM_ICONS.ml,
    trainer: 'أحمد الحربي',
    duration: 'أسبوع واحد',
    from: '22/8',
    to: '28/8',
  },
];

export const OUTCOMES = [
  'تحليل البيانات باحترافية',
  'بناء لوحات تفاعلية (Dashboards)',
  'كتابة استعلامات SQL',
  'تحليل البيانات بالذكاء الاصطناعي',
];

export const TRAINERS = [
  {
    name: 'فاطمة الحويطي',
    icon: PROGRAM_ICONS.excel,
    experience: [
      'مدربة معتمدة من Microsoft (MCT)',
      'خبرة في تحليل الجداول وبناء التقارير',
      'تدريب عملي على Pivot وتنظيف البيانات',
    ],
  },
  {
    name: 'وليد عبدالعظيم',
    icon: PROGRAM_ICONS.powerbi,
    experience: [
      'محلل بيانات ومدرب متخصص في Power BI',
      'بناء لوحات تفاعلية ومؤشرات KPIs',
      'خبرة تطبيقية في DAX ولوحات الأعمال',
    ],
  },
  {
    name: 'ياسمين البلوي',
    icon: PROGRAM_ICONS.sql,
    experience: [
      'متخصصة في SQL وتحليل قواعد البيانات',
      'تصميم استعلامات وهيكلة البيانات',
      'خبرة عملية مع MySQL وقواعد البيانات',
    ],
  },
  {
    name: 'أحمد الحربي',
    icon: PROGRAM_ICONS.ml,
    experience: [
      'محلل بيانات ومتخصص ذكاء اصطناعي',
      'خريج أكاديمية طويق',
      'تطبيقات AI وAgentic AI وتحليل الرؤى',
    ],
  },
];

export const PRICING = {
  oldPrice: '1,400',
  discount: 'خصم 36%',
  newPrice: '899',
  currency: 'ر.س',
  installment: 'تقسيط متاح — تواصل معنا للتفاصيل',
  includes: ['تدريب مباشر 100%', 'تسجيلات المحاضرات', '4 مشاريع عملية', 'شهادة إتمام', 'دعم ومتابعة'],
  phone: '0504581123',
};

export const META = {
  startDate: '1 أغسطس 2026',
  dateRange: '1 – 31 أغسطس 2026',
  time: '8 – 10 مساءً',
  tagline: 'من نثر البيانات، نصنع المعنى.',
  brand: '© 2026 Nathra',
};
