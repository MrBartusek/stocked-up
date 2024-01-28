/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#d97706',
				'primary-hover': '#b45309',
				secondary: '#6b7280',
				'secondary-hover': '#4b5563',
				danger: '#dc2626',
				'danger-hover': '#b91c1c',
				success: '#16a34a',
				'success-hover': '#15803d',
				dark: '#1d1506',
				accent: '#fef2e3',
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
