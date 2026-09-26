import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
await copyFile(path.join(root, 'dev-index.html'), path.join(root, 'index.html'));
