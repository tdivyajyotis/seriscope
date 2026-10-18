import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'styles.css',
  'script.js',
  'public/images/research/microscopy.png',
  'public/images/research/gradcam.png',
  'public/images/research/fieldwork.png',
  'public/images/research/workflow.jpg',
  'public/research/seriscope-project-report.pdf',
];

const html = await readFile(join(root, 'index.html'), 'utf8');
const referencedLocalFiles = [
  ...html.matchAll(/(?:src|href)="(public\/[^"]+)"/g),
].map((match) => match[1]);

await Promise.all(
  [...new Set([...requiredFiles, ...referencedLocalFiles])].map((file) =>
    access(join(root, file)),
  ),
);

for (const marker of ['<main', 'styles.css', 'script.js', 'public/images/']) {
  if (!html.includes(marker)) {
    throw new Error(`index.html is missing required marker: ${marker}`);
  }
}

console.log(
  `Verified ${new Set([...requiredFiles, ...referencedLocalFiles]).size} local files for the static site.`,
);
