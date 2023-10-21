/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#d97706',
				'primary-hover': '#b45309',
				secondary: '#fef2e3',
				dark: '#1d1506',
				accent: '#265BB5',
				muted: '#475569',
				light: '#f3f4f6',
				gray: {
					150: '#ECEEF1',
				},
			},
			container: {
				screens: {
					sm: '576px',
					md: '786px',
					lg: '992px',
					xl: '1200px',
					'2xl': '1400px',
				},
			},
		},
	},
	plugins: [],
};
