import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'partnership-preview.html');
const pngPath = path.join(__dirname, 'partnership-preview-example.png');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 980, height: 420, deviceScaleFactor: 2 });
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
await page.screenshot({ path: pngPath, type: 'png' });
await browser.close();

console.log('Saved:', pngPath);
