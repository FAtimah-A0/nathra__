import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPartnerLogo, renderPartnershipBar, getPartnershipBarStyles } from './build-ad.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderScheduleRows(steps) {
  return steps.map((step) => `
          <tr>
            <td class="col-num">${String(step.order).padStart(2, '0')}</td>
            <td class="col-landmark">${escapeHtml(step.landmark)}</td>
            <td class="col-module">${escapeHtml(step.module)}</td>
            <td class="col-trainer">${escapeHtml(step.trainer?.name || '—')}</td>
            <td class="col-days">${escapeHtml(step.daysCount || step.duration)}</td>
            <td class="col-from">${escapeHtml(step.dateFrom || '—')}</td>
            <td class="col-to">${escapeHtml(step.dateTo || '—')}</td>
          </tr>`).join('');
}

export function renderScheduleTableHtml(config) {
  const templatePath = path.join(__dirname, 'template-trainer-schedule-table.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  const replacements = {
    '{{PAGE_TITLE}}': escapeHtml(config.pageTitle),
    '{{LOGO_SRC}}': escapeHtml(config.brand.logo),
    '{{PARTNERSHIP_BAR}}': renderPartnershipBar(config.brand),
    '{{PARTNERSHIP_STYLES}}': getPartnershipBarStyles(),
    '{{PARTNER_LOGO_BLOCK}}': renderPartnerLogo(config.brand),
    '{{HERO_IMAGE}}': escapeHtml(config.heroImage || 'data-ai-hero.png'),
    '{{BRAND_TAG}}': escapeHtml(config.brand.tag),
    '{{TITLE}}': escapeHtml(config.title),
    '{{SUBTITLE}}': escapeHtml(config.subtitle),
    '{{START_DATE}}': escapeHtml(config.meta.startDate),
    '{{TOTAL_HOURS}}': escapeHtml(config.meta.totalHours),
    '{{TOTAL_WEEKS}}': escapeHtml(config.meta.totalWeeks),
    '{{TIME_SLOT}}': escapeHtml(config.meta.timeSlot),
    '{{SCHEDULE_ROWS}}': renderScheduleRows(config.steps),
    '{{FOOTER_TAGLINE}}': escapeHtml(config.footer.tagline),
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  return html;
}

export async function buildScheduleTable(configPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const outputName = config.outputName || 'bootcamp-trainer-schedule-table';
  const htmlPath = path.join(projectRoot, `${outputName}.html`);
  const pngPath = path.join(projectRoot, `${outputName}.png`);
  const html = renderScheduleTableHtml(config);

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
