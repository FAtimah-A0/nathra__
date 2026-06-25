import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildTreasureMap } from './build-treasure-map.mjs';
import { buildScheduleTable } from './build-trainer-schedule-table.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const studentsConfig = path.join(__dirname, 'configs', 'bootcamp-treasure-map-students.json');
const trainersConfig = path.join(__dirname, 'configs', 'bootcamp-treasure-map-trainers.json');
const tableConfig = path.join(__dirname, 'configs', 'bootcamp-trainer-schedule-table.json');
const exportsRoot = path.join(projectRoot, 'exports', 'bootcamp-treasure-maps');

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log('Building students treasure map...');
const students = await buildTreasureMap(studentsConfig);
copyIfExists(students.pngPath, path.join(exportsRoot, 'students', path.basename(students.pngPath)));
copyIfExists(students.htmlPath, path.join(exportsRoot, 'students', path.basename(students.htmlPath)));
copyIfExists(studentsConfig, path.join(exportsRoot, 'students', 'config.json'));

console.log('Building trainers treasure map...');
const trainers = await buildTreasureMap(trainersConfig);
copyIfExists(trainers.pngPath, path.join(exportsRoot, 'trainers', path.basename(trainers.pngPath)));
copyIfExists(trainers.htmlPath, path.join(exportsRoot, 'trainers', path.basename(trainers.htmlPath)));
copyIfExists(trainersConfig, path.join(exportsRoot, 'trainers', 'config.json'));

console.log('Building trainers schedule table...');
const table = await buildScheduleTable(tableConfig);
copyIfExists(table.pngPath, path.join(exportsRoot, 'trainers', path.basename(table.pngPath)));
copyIfExists(table.htmlPath, path.join(exportsRoot, 'trainers', path.basename(table.htmlPath)));
copyIfExists(tableConfig, path.join(exportsRoot, 'trainers', 'schedule-table-config.json'));

const desktop = path.join(process.env.USERPROFILE || '', 'Downloads');
copyIfExists(students.pngPath, path.join(desktop, 'خريطة-المعسكر-طلاب.png'));
copyIfExists(trainers.pngPath, path.join(desktop, 'خريطة-المعسكر-مدربين-نثره.png'));
copyIfExists(table.pngPath, path.join(desktop, 'جدول-المعسكر-مدربين-نثره.png'));

console.log('\nDone.');
console.log('Students:', students.pngPath);
console.log('Trainers:', trainers.pngPath);
console.log('Table:', table.pngPath);
console.log('Archive:', exportsRoot);
