import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync } from 'fs';
import { join } from 'path';

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
