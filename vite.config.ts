import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	root: 'src',
	base: '/dnd-character-manager/',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
	},
	plugins: [
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
		viteStaticCopy({
			targets: [
				{
					src: 'assets/icons/**/*',
					dest: 'assets/icons',
				},
			],
		}),
	],
	server: {
		port: 4000,
		open: true,
	},
});
