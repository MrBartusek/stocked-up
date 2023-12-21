import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
			'/public': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
	optimizeDeps: {
		include: ['shared-types'],
	},
});
