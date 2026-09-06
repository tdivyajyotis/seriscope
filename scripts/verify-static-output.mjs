import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'dist', 'client');
const routes = [
  'index',
  'contact',
  'impact',
  'research',
  'story',
  'technology',
  '404',
];

await Promise.all(
  routes.map(async (route) => {
    const outputPath = join(outputDirectory, `${route}.html`);
    await access(outputPath);

    const html = await readFile(outputPath, 'utf8');
    if (route !== '404' && !html.includes('<main')) {
      throw new Error(`${route}.html does not contain rendered page content`);
    }
  }),
);

console.log(`Verified ${routes.length} statically rendered routes.`);
