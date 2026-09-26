import { cp, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const entries = await readdir(output, { withFileTypes: true });

await rm(path.join(root, 'assets'), { recursive: true, force: true });
for (const entry of entries) {
  await cp(path.join(output, entry.name), path.join(root, entry.name), { recursive: true, force: true });
}

console.log('Published the Vite build to the repository root for GitHub Pages branch deployment.');
