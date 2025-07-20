import { defineConfig } from 'vite';

export default defineConfig({
	root: '.',
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: './src/static/main.ts'
		}
	},
	server: {
		port: 8080
	}
});
