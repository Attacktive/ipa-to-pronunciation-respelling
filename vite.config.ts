import { defineConfig } from 'vite';

export default defineConfig({
	root: '.',
	base: './',
	build: {
		outDir: 'dist'
	},
	server: {
		port: 8080
	}
});
