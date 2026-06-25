import { buildPoster } from './poster-kit/build-ad.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, 'poster-kit', 'configs', 'bootcamp-data-ai.json');

const { htmlPath, pngPath, clickablePath } = await buildPoster(configPath);
console.log('Poster saved to:', pngPath);
console.log('HTML saved to:', htmlPath);
console.log('Clickable image saved to:', clickablePath);
