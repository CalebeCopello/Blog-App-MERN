/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/lib/esm/**/*.js',
	],
	theme: {
		// colors: {
		// 	cyan: {
		// 		50: "#FEF3EC",
		// 		100: "#FDEADD",
		// 		200: "#FACFB2",
		// 		300: "#F7B183",
		// 		400: "#F38A44",
		// 		500: "#D65D0E",
		// 		600: "#C4560D",
		// 		700: "#A84A0B",
		// 		800: "#8B3D09",
		// 		900: "#602A06",
		// 		950: "#431D04"
		// 	},
		// },
		extend: {
			colors: {
				red0: '#cc241d',
				green0: '#98971a',
				yellow0: '#d79921',
				blue0: '#458588',
				purple0: '#b16286',
				aqua0: '#689d6a',
				gray0: '#928374',
				gray1: '#928374',
				orange0: '#d65d0e',
				bg0_h_lm: '#f9f5d7',
				bg0_lm: '#fbf1c7',
				bg1_lm: '#ebdbb2',
				bg2_lm: '#d5c4a1',
				bg3_lm: '#bdae93',
				bg4_lm: '#a89984',
				bg0_s_lm: '#f2e5bc',
				fg0_lm: '#282828',
				fg1_lm: '#3c3836',
				fg2_lm: '#504945',
				fg3_lm: '#665c54',
				fg4_lm: '#7c6f64',
				gray3_lm: '#7c6f64',
				red1_lm: '#9d0006',
				green1_lm: '#79740e',
				yellow1_lm: '#b57614',
				blue1_lm: '#076678',
				purple1_lm: '#8f3f71',
				aqua1_lm: '#427b58',
				orange1_lm: '#af3a03',
				bg0_h_dm: '#1d2021',
				bg0_dm: '#282828',
				bg1_dm: '#3c3836',
				bg2_dm: '#504945',
				bg3_dm: '#665c54',
				bg4_dm: '#7c6f64',
				bg0_s_dm: '#32302f',
				fg0_dm: '#fbf1c7',
				fg1_dm: '#ebdbb2',
				fg2_dm: '#d5c4a1',
				fg3_dm: '#bdae93',
				fg4_dm: '#a89984',
				gray3_dm: '#a89984',
				red1_dm: '#fb4934',
				green1_dm: '#b8bb26',
				yellow1_dm: '#fabd2f',
				blue1_dm: '#83a598',
				purple1_dm: '#d3869b',
				aqua1_dm: '#8ec07c',
				orange1_dm: '#fe8019',
			},
			fontFamily: {
				JetBrainsMono: ['JetBrainsMono', 'monospace'],
				Onest: ['Onest', 'sans-serif'],
				YoungSerif: ['YoungSerif', 'serif'],
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('flowbite/plugin')],
}
