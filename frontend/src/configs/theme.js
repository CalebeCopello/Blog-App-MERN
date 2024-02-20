const textInputThemeConfig = {
	field: {
		input: {
			colors: {
				gray: 'bg-bg0_h_lm border-orange0 text-gray-900 focus:border-orange1_lm focus:ring-orange1_lm dark:bg-bg0_dm dark:text-bg0_h_lm dark:placeholder-gray-400 dark:focus:border-orange1_dm dark:focus:ring-orange1_dm',
			},
		},
	},
}

const buttonThemeConfig = {
	color: {
		info: 'text-bg0_h_lm bg-orange0 border border-transparent enabled:hover:bg-orange1_lm focus:ring-4 focus:ring-orange0 dark:bg-orange0 dark:enabled:hover:bg-orange1_dm dark:focus:ring-orange0',
	},
}

const navbarThemeConfig = {
	link: {
		active: {
			on: 'bg-orange0 text-fg0_lm dark:text-bg0_h_lm md:bg-transparent md:text-orange0 md:dark:text-orange1_dm',
			off: 'border-b border-gray-100  text-fg0_lm hover:bg-orange1_lm dark:border-gray-700 dark:text-bg0_lm dark:hover:bg-orange1_dm dark:hover:text-bg0_h_lm md:border-0 md:hover:bg-transparent md:hover:text-orange1_lm md:dark:hover:bg-transparent md:dark:hover:text-orange1_dm',
		},
		disabled: {
			on: 'text-gray-400 hover:cursor-not-allowed dark:text-gray-600',
			off: '',
		},
	},
}

export { textInputThemeConfig, buttonThemeConfig, navbarThemeConfig }
