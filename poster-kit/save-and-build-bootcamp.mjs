import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildPoster } from './build-ad.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

function archiveBuild({ htmlPath, pngPath, clickablePath, configPath }, archiveDir) {
  ensureDir(archiveDir);
  copyIfExists(configPath, path.join(archiveDir, path.basename(configPath)));
  copyIfExists(htmlPath, path.join(archiveDir, path.basename(htmlPath)));
  copyIfExists(pngPath, path.join(archiveDir, path.basename(pngPath)));
  copyIfExists(clickablePath, path.join(archiveDir, path.basename(clickablePath)));
  copyIfExists(
    path.join(projectRoot, 'data-ai-hero.png'),
    path.join(archiveDir, 'data-ai-hero.png'),
  );
}

const v1Config = path.join(__dirname, 'configs', 'bootcamp-data-ai-v1-bg-saved.json');
const v2Config = path.join(__dirname, 'configs', 'bootcamp-data-ai-v2-ads.json');
const exportsRoot = path.join(projectRoot, 'exports', 'bootcamp-saved');

console.log('Saving v1 (background layout)...');
const v1 = await buildPoster(v1Config);
archiveBuild(v1, path.join(exportsRoot, 'v1-bg'));

console.log('Building v2 (ad designer layout)...');
const v2 = await buildPoster(v2Config);
archiveBuild(v2, path.join(exportsRoot, 'v2-ads'));

const desktopV1 = path.join(process.env.USERPROFILE || '', 'Downloads', 'معسكر-تحليل-البيانات-والذكاء-الاصطناعي.png');
const desktopV2 = path.join(process.env.USERPROFILE || '', 'Downloads', 'معسكر-تحليل-البيانات-والذكاء-الاصطناعي-نسخة2.png');
copyIfExists(v1.pngPath, desktopV1);
copyIfExists(v2.pngPath, desktopV2);

console.log('\nDone.');
console.log('V1 (saved):', v1.pngPath);
console.log('V2 (ads):', v2.pngPath);
console.log('Archive:', exportsRoot);
