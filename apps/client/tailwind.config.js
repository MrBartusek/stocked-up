/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primary: '#d97706',
				secondary: '#F0DBB7',
				dark: '#1d1506',
				accent: '#265BB5',
				muted: '#475569',
				gray: {
					150: '#ECEEF1'
				}
			}
		}
	},
	plugins: []
};
