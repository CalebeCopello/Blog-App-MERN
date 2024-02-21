const textInputThemeConfig = {
	addon:
		'inline-flex items-center rounded-l-md border border-r-0 border-orange0 bg-bg2_lm px-3 text-sm text-fg0_lm dark:border-orange0 dark:bg-bg2_dm dark:text-fg0_dm',
	field: {
		rightIcon: {
			base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
			svg: 'h-5 w-5 text-gray3_lm dark:text-gray3_dm',
		},
		input: {
			colors: {
				gray: 'bg-bg0_h_lm border-orange0 text-gray-900 focus:border-orange1_lm focus:ring-orange1_lm dark:bg-bg0_dm dark:text-bg0_h_lm dark:placeholder-gray-400 dark:focus:border-orange1_dm dark:focus:ring-orange1_dm',
			},
		},
	},
}

const buttonThemeConfig = {
	color: {
		info: 'text-bg0_h_lm bg-orange0 border border-transparent enabled:hover:bg-orange1_lm focus:ring-4 focus:ring-orange1_lm dark:bg-orange0 dark:enabled:hover:bg-orange1_dm dark:focus:ring-orange1_dm',
	},
}

const navbarThemeConfig = {
	root: {
		base: 'bg-bg2_lm px-2 py-2.5 border-orange1_lm dark:border-orange1_dm dark:bg-bg2_dm sm:px-4',
	},
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
	toggle: {
		base: 'inline-flex items-center rounded-lg p-2 text-sm text-fg0_lm hover:bg-orange1_lm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-fg0_dm dark:hover:bg-orange1_dm dark:focus:ring-gray-600 md:hidden',
		icon: 'h-6 w-6 shrink-0',
	},
}


const footerThemeConfig = {
	root: {
		base: 'w-full rounded-lg bg-bg2_lm shadow border-orange1_lm dark:border-orange1_dm  dark:bg-bg2_dm md:flex md:items-center md:justify-between',
	},
}

export {
	textInputThemeConfig,
	buttonThemeConfig,
	navbarThemeConfig,
	footerThemeConfig,
}
