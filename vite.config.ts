import { defineConfig } from 'vitest/config';
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
	test: {
		environment: 'node',
		globals: true,
		dir: './test',
		coverage: {
			reportsDirectory: '../test/coverage',
			thresholds: {
				perFile: true,

				// Override for specific files
				'./services/**/*.ts': {
					'100': true,
				},

				'./mappers/**/*.ts': {
					'100': true,
				},
			},
			include: ['**/*.ts'],
			// Files and folders to exclude from coverage
			// Over time we should aim to reduce this list
			exclude: [
				'interfaces/**',
				'wiring/**',
				'main.ts',
				'register-components.ts',
			],
		},
	},
});
