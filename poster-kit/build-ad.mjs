import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shortFormUrl(url) {
  return url.replace(/^https?:\/\//, '');
}

function qrUrl(registerUrl, size = 105) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(registerUrl)}`;
}

export function renderPartnerLogo(brand = {}) {
  if (brand.partnerLogo) {
    return `<img class="partner-logo-img" src="${escapeHtml(brand.partnerLogo)}" alt="${escapeHtml(brand.partnerName || 'Sahab')}" />`;
  }

  return `<div class="partner-logo-placeholder"><span>${escapeHtml(brand.partnerName || 'سهب')}</span></div>`;
}

export function getPartnershipBarStyles() {
  return fs.readFileSync(path.join(__dirname, 'partnership-bar.css'), 'utf8');
}

export function renderPartnershipBar(brand = {}) {
  return `
        <div class="partnership-bar">
          <div class="logo-slot nathra">
            <img src="${escapeHtml(brand.logo)}" alt="Nathra" />
          </div>
          <div class="partnership-divider"></div>
          <div class="logo-slot sahab">
            ${renderPartnerLogo(brand)}
          </div>
        </div>`;
}

function renderTools(tools) {
  return tools.map((tool) => `
        <div class="tool-pill">
          <div class="tool-icon">
            <img src="${escapeHtml(tool.icon)}" alt="${escapeHtml(tool.name)}" />
          </div>
          <span class="tool-name">${escapeHtml(tool.name)}</span>
        </div>`).join('\n');
}

function renderStats(stats) {
  return stats.map((stat) => `
          <div class="stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-label">${escapeHtml(stat.label)}</div>
            <div class="stat-value">${escapeHtml(stat.value)}</div>
          </div>`).join('\n');
}

function renderDates(days) {
  return days.map((day) => `
            <div class="date-block">
              <div class="date-block-top">
                <span class="session">${escapeHtml(day.session)}</span>
                <span class="weekday">${escapeHtml(day.weekday)}</span>
              </div>
              <div class="date-block-body">
                <div class="day-num">${escapeHtml(day.day)}</div>
                <div class="day-month">${escapeHtml(day.month)}</div>
              </div>
            </div>`).join('\n');
}

function renderLearnColumn(items) {
  return items.map((item) => `
              <div class="learn-point"><div class="learn-check">✓</div><span>${escapeHtml(item)}</span></div>`).join('\n');
}

function renderLearnPanel(learn) {
  const [col1 = [], col2 = []] = learn.columns;
  return `
        <div class="learn-panel">
          <div class="learn-header">
            <div class="learn-title">${escapeHtml(learn.title)}</div>
            <div class="learn-sub">${escapeHtml(learn.subtitle)}</div>
          </div>
          <div class="learn-columns">
            <div class="learn-col">${renderLearnColumn(col1)}</div>
            <div class="learn-col">${renderLearnColumn(col2)}</div>
          </div>
        </div>`;
}

function renderMetricRibbon(stats) {
  return stats.map((stat, index) => {
    const divider = index < stats.length - 1
      ? '\n        <div class="metric-divider"></div>'
      : '';
    return `
        <div class="metric">
          <div class="metric-value">${escapeHtml(stat.value)}</div>
          <div class="metric-label">${stat.icon} ${escapeHtml(stat.label)}</div>
        </div>${divider}`;
  }).join('');
}

function renderModuleGrid(items) {
  return items.map((item, index) => {
    const [name, detail = ''] = item.split(' — ');
    return `
        <div class="module-card">
          <div class="module-num">${String(index + 1).padStart(2, '0')}</div>
          <div class="module-name">${escapeHtml(name)}</div>
          <div class="module-detail">${escapeHtml(detail)}</div>
        </div>`;
  }).join('');
}

function renderFeatureTags(items) {
  return items.map((item) => `
        <span class="feature-tag">${escapeHtml(item)}</span>`).join('');
}

export function renderPosterHtml(config) {
  const layout = config.layout || 'portrait';
  const templateMap = {
    landscape: 'template-landscape.html',
    pro: 'template-pro.html',
    bg: 'template-bg.html',
    ads: 'template-ads.html',
  };
  const templateName = templateMap[layout] || 'template.html';
  const templatePath = path.join(__dirname, templateName);
  let html = fs.readFileSync(templatePath, 'utf8');
  const registerUrl = config.cta.registerUrl;
  const formShort = shortFormUrl(registerUrl);
  const qrSizeMap = { landscape: 72, pro: 88, ads: 92 };
  const qrSize = qrSizeMap[layout] || 105;
  const [col1 = [], col2 = []] = config.learn.columns;
  const startDay = config.schedule.days?.[0] || {};
  const titleHtml = layout === 'pro' && config.titleLines.length > 1
    ? `${escapeHtml(config.titleLines[0])}<br/><span class="title-accent">${escapeHtml(config.titleLines.slice(1).join(' '))}</span>`
    : config.titleLines.map(escapeHtml).join('<br/>');

  const replacements = {
    '{{PAGE_TITLE}}': escapeHtml(config.pageTitle),
    '{{LOGO_SRC}}': escapeHtml(config.brand.logo),
    '{{PARTNERSHIP_BAR}}': renderPartnershipBar(config.brand),
    '{{PARTNERSHIP_STYLES}}': getPartnershipBarStyles(),
    '{{PARTNER_LOGO_BLOCK}}': renderPartnerLogo(config.brand),
    '{{BRAND_TAG}}': escapeHtml(config.brand.tag),
    '{{TOP_BADGE}}': escapeHtml(config.topBadge),
    '{{TITLE_HTML}}': titleHtml,
    '{{SUBTITLE}}': escapeHtml(config.subtitle),
    '{{HERO_IMAGE}}': escapeHtml(config.heroImage || 'data-ai-hero.png'),
    '{{TOOLS_ROW}}': renderTools(config.tools),
    '{{STATS_STRIP}}': renderStats(config.stats),
    '{{METRIC_RIBBON}}': renderMetricRibbon(config.stats),
    '{{MODULE_GRID}}': renderModuleGrid(col1),
    '{{FEATURE_TAGS}}': renderFeatureTags(col2),
    '{{START_DAY}}': escapeHtml(startDay.day || ''),
    '{{START_MONTH}}': escapeHtml(startDay.month || ''),
    '{{START_WEEKDAY}}': escapeHtml(startDay.weekday || ''),
    '{{SCHEDULE_TITLE}}': escapeHtml(config.schedule.title),
    '{{SCHEDULE_MONTH}}': escapeHtml(config.schedule.monthTag),
    '{{DATES_STRIP}}': renderDates(config.schedule.days),
    '{{DATES_SUMMARY}}': config.schedule.summary,
    '{{LEARN_PANEL}}': renderLearnPanel(config.learn),
    '{{LEARN_TITLE}}': escapeHtml(config.learn.title),
    '{{LEARN_SUBTITLE}}': escapeHtml(config.learn.subtitle),
    '{{LEARN_COL_1}}': renderLearnColumn(col1),
    '{{LEARN_COL_2}}': renderLearnColumn(col2),
    '{{REGISTER_URL}}': escapeHtml(registerUrl),
    '{{QR_IMAGE_URL}}': qrUrl(registerUrl, qrSize),
    '{{REGISTER_LABEL}}': escapeHtml(config.cta.registerLabel),
    '{{REGISTER_BUTTON}}': escapeHtml(config.cta.registerButton),
    '{{FORM_LINK}}': escapeHtml(formShort),
    '{{LIMITED_TAG}}': escapeHtml(config.cta.limitedTag),
    '{{PRICE_LABEL}}': escapeHtml(config.cta.priceLabel),
    '{{OLD_PRICE}}': escapeHtml(config.cta.oldPrice),
    '{{NEW_PRICE}}': escapeHtml(config.cta.newPrice),
    '{{CURRENCY}}': escapeHtml(config.cta.currency),
    '{{FOOTER_TAGLINE}}': escapeHtml(config.footer.tagline),
    '{{FOOTER_WHATSAPP}}': escapeHtml(config.footer.whatsapp),
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  return html;
}

export function renderInteractivePosterHtml(config, imageFileName, layout = 'portrait') {
  const registerUrl = escapeHtml(config.cta.registerUrl);
  const pngName = escapeHtml(imageFileName);
  const title = escapeHtml(config.pageTitle);
  const isLandscape = layout === 'landscape';
  const maxWidth = isLandscape ? '1920px' : '1080px';
  const hotspotMap = {
    landscape: 'left: 4%; top: 58%; width: 42%; height: 28%;',
    pro: 'left: 5%; top: 83.5%; width: 58%; height: 11%;',
    ads: 'left: 34%; top: 85%; width: 58%; height: 10%;',
  };
  const hotspot = hotspotMap[layout] || 'left: 43.5%; top: 84.5%; width: 53.5%; height: 10.5%;';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — سجل</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #061228;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 16px;
      font-family: 'Segoe UI', Tahoma, sans-serif;
    }
    .poster-shell {
      position: relative;
      width: min(${maxWidth}, 100%);
      line-height: 0;
    }
    .poster-shell img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
    }
    .register-hotspot {
      position: absolute;
      ${hotspot}
      cursor: pointer;
      z-index: 2;
      border-radius: 16px;
    }
    .register-hotspot:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <div class="poster-shell">
    <img src="${pngName}" alt="${title}" />
    <a
      class="register-hotspot"
      href="${registerUrl}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${escapeHtml(config.cta.registerButton)}"
      title="${escapeHtml(config.cta.registerButton)}"
    ></a>
  </div>
</body>
</html>`;
}

export async function buildPoster(configPath, options = {}) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const layout = config.layout || 'portrait';
  const outputName = options.outputName || config.outputName || 'ad-poster';
  const htmlPath = path.join(projectRoot, `${outputName}.html`);
  const pngPath = path.join(projectRoot, `${outputName}.png`);
  const clickablePath = path.join(projectRoot, `${outputName}-clickable.html`);
  const html = renderPosterHtml(config);

  fs.writeFileSync(htmlPath, html, 'utf8');

  const viewportMap = {
    landscape: { width: 1920, height: 1080 },
    pro: { width: 1080, height: 1350 },
    ads: { width: 1080, height: 1350 },
    bg: { width: 1080, height: 1350 },
  };
  const viewport = viewportMap[layout] || { width: 1080, height: 1350 };

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ ...viewport, deviceScaleFactor: 2 });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('.poster');
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: viewport.width, height: viewport.height },
  });
  await browser.close();

  const clickableHtml = renderInteractivePosterHtml(config, `${outputName}.png`, layout);
  fs.writeFileSync(clickablePath, clickableHtml, 'utf8');

  return { htmlPath, pngPath, clickablePath, configPath, layout };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const configArg = process.argv[2] || path.join(__dirname, 'configs', 'course-data-org.json');
  const configPath = path.isAbsolute(configArg) ? configArg : path.join(process.cwd(), configArg);
  buildPoster(configPath)
    .then(({ htmlPath, pngPath, clickablePath }) => {
      console.log('HTML saved to:', htmlPath);
      console.log('PNG saved to:', pngPath);
      console.log('Clickable image saved to:', clickablePath);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
