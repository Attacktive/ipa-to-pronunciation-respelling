import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	root: '.',
	base: './',
	build: {
		outDir: 'dist'
	},
	server: {
		port: 8080
	},
	plugins: [
		{
			name: 'copy favicon',
			closeBundle: () => {
				const __dirname = dirname(fileURLToPath(import.meta.url));
				const destDir = join(__dirname, 'dist');

				mkdirSync(destDir, { recursive: true });
				copyFileSync(
					join(__dirname, 'src', 'static', 'favicon.ico'),
					join(destDir, 'favicon.ico')
				);
			}
		}
	]
});
