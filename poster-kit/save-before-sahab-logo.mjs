import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const archiveRoot = path.join(projectRoot, 'exports', 'bootcamp-saved-before-sahab-logo');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copy(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

const v1Dir = path.join(archiveRoot, 'v1-bg');
const v2Dir = path.join(archiveRoot, 'v2-ads');

ensureDir(v1Dir);
ensureDir(v2Dir);

copy(path.join(projectRoot, 'bootcamp-data-ai-poster.png'), path.join(v1Dir, 'bootcamp-data-ai-poster.png'));
copy(path.join(projectRoot, 'bootcamp-data-ai-poster.html'), path.join(v1Dir, 'bootcamp-data-ai-poster.html'));
copy(path.join(projectRoot, 'bootcamp-data-ai-poster-clickable.html'), path.join(v1Dir, 'bootcamp-data-ai-poster-clickable.html'));
copy(path.join(__dirname, 'configs', 'bootcamp-data-ai-v1-bg-saved.json'), path.join(v1Dir, 'config.json'));

copy(path.join(projectRoot, 'bootcamp-data-ai-poster-v2.png'), path.join(v2Dir, 'bootcamp-data-ai-poster-v2.png'));
copy(path.join(projectRoot, 'bootcamp-data-ai-poster-v2.html'), path.join(v2Dir, 'bootcamp-data-ai-poster-v2.html'));
copy(path.join(projectRoot, 'bootcamp-data-ai-poster-v2-clickable.html'), path.join(v2Dir, 'bootcamp-data-ai-poster-v2-clickable.html'));
copy(path.join(__dirname, 'configs', 'bootcamp-data-ai-v2-ads.json'), path.join(v2Dir, 'config.json'));

copy(path.join(projectRoot, 'data-ai-hero.png'), path.join(archiveRoot, 'data-ai-hero.png'));
copy(path.join(__dirname, 'configs', 'bootcamp-data-ai.json'), path.join(archiveRoot, 'bootcamp-data-ai-active.json'));

const desktop = path.join(process.env.USERPROFILE || '', 'Downloads');
copy(path.join(projectRoot, 'bootcamp-data-ai-poster.png'), path.join(desktop, 'معسكر-محفوظ-قبل-شعار-سهب-v1.png'));
copy(path.join(projectRoot, 'bootcamp-data-ai-poster-v2.png'), path.join(desktop, 'معسكر-محفوظ-قبل-شعار-سهب-v2.png'));

console.log('Saved to:', archiveRoot);
