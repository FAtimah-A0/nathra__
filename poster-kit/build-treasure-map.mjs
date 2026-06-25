import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

import { renderPartnerLogo, renderPartnershipBar, getPartnershipBarStyles } from './build-ad.mjs';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMapStops(steps, showTrainer) {
  const positions = ['pos-1', 'pos-2', 'pos-3', 'pos-4'];
  return steps.map((step, index) => {
    const trainerBlock = showTrainer && step.trainer
      ? `<div class="stop-trainer">
            <div class="trainer-name">${escapeHtml(step.trainer.name)}</div>
            <div class="trainer-title">${escapeHtml(step.trainer.title)}</div>
            <div class="trainer-tags">${(step.trainer.highlights || []).map((h) => `<span>${escapeHtml(h)}</span>`).join('')}</div>
          </div>`
      : `<div class="stop-skills">${escapeHtml(step.skills)}</div>`;

    const isTreasure = index === steps.length - 1;

    const daysCount = step.daysCount || step.duration;
    const dateRange = step.dateFrom && step.dateTo
      ? `${escapeHtml(step.dateFrom)} → ${escapeHtml(step.dateTo)}`
      : escapeHtml(step.duration || '');
    const scheduleBlock = `
          <div class="stop-days">${escapeHtml(daysCount)}</div>
          <div class="stop-dates">${dateRange}</div>`;

    return `
      <article class="map-stop ${positions[index]} ${isTreasure ? 'is-treasure' : ''}">
        <div class="stop-marker">
          <span class="stop-num">${String(step.order).padStart(2, '0')}</span>
          <span class="stop-icon">${step.icon}</span>
        </div>
        <div class="stop-card">
          <div class="stop-landmark">${escapeHtml(step.landmark)}</div>
          <div class="stop-module">${escapeHtml(step.module)}</div>
          ${scheduleBlock}
          ${trainerBlock}
        </div>
      </article>`;
  }).join('\n');
}

export function renderTreasureMapHtml(config) {
  const templatePath = path.join(__dirname, 'template-treasure-map.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  const showTrainer = Boolean(config.showTrainer);

  const replacements = {
    '{{PAGE_TITLE}}': escapeHtml(config.pageTitle),
    '{{LOGO_SRC}}': escapeHtml(config.brand.logo),
    '{{PARTNERSHIP_BAR}}': renderPartnershipBar(config.brand),
    '{{PARTNERSHIP_STYLES}}': getPartnershipBarStyles(),
    '{{PARTNER_LOGO_BLOCK}}': renderPartnerLogo(config.brand),
    '{{HERO_IMAGE}}': escapeHtml(config.heroImage || 'data-ai-hero.png'),
    '{{BRAND_TAG}}': escapeHtml(config.brand.tag),
    '{{AUDIENCE_BADGE}}': escapeHtml(config.audienceBadge),
    '{{TITLE}}': escapeHtml(config.title),
    '{{SUBTITLE}}': escapeHtml(config.subtitle),
    '{{JOURNEY_LABEL}}': escapeHtml(config.journeyLabel || 'خريطة الرحلة'),
    '{{START_LABEL}}': escapeHtml(config.startLabel || 'نقطة الانطلاق'),
    '{{START_DATE}}': escapeHtml(config.meta.startDate),
    '{{TOTAL_HOURS}}': escapeHtml(config.meta.totalHours),
    '{{TOTAL_WEEKS}}': escapeHtml(config.meta.totalWeeks),
    '{{TIME_SLOT}}': escapeHtml(config.meta.timeSlot),
    '{{TREASURE_TITLE}}': escapeHtml(config.treasure.title),
    '{{TREASURE_SUB}}': escapeHtml(config.treasure.subtitle),
    '{{FOOTER_TAGLINE}}': escapeHtml(config.footer.tagline),
    '{{MAP_STOPS}}': renderMapStops(config.steps, showTrainer),
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  return html;
}

export async function buildTreasureMap(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const outputName = config.outputName || 'bootcamp-treasure-map';
  const htmlPath = path.join(projectRoot, `${outputName}.html`);
  const pngPath = path.join(projectRoot, `${outputName}.png`);
  const html = renderTreasureMapHtml(config);

  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForSelector('.poster');
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: { x: 0, y: 0, width: 1080, height: 1350 },
  });
  await browser.close();

  return { htmlPath, pngPath, configPath };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const configArg = process.argv[2];
  if (!configArg) {
    console.error('Usage: node build-treasure-map.mjs <config.json>');
    process.exit(1);
  }
  const configPath = path.isAbsolute(configArg) ? configArg : path.join(process.cwd(), configArg);
  buildTreasureMap(configPath)
    .then(({ htmlPath, pngPath }) => {
      console.log('HTML saved to:', htmlPath);
      console.log('PNG saved to:', pngPath);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
