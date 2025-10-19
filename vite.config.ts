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
				// Global values
				lines: 80,
				functions: 80,
				branches: 75,
				statements: 80,
				perFile: true,

				// Override for specific files
				'./services/**/*.ts': {
					lines: 100,
					functions: 100,
					branches: 100,
					statements: 100,
				},
			},
			// Files and folders to exclude from coverage
			// Over time we should aim to reduce this list
			exclude: [
				'assets/**',
				'features/**',
				'homebrew/**',
				'interfaces/**',
				'mappers/**',
				'repositories/**',
				'store/**',
				'styles/**',
				'types/**',
				'utils/**',
				'wiring/**',
				'main.ts',
				'register-components.ts',
			],
		},
	},
});
