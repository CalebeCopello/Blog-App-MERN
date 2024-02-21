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

const sidebarThemeConfig = {
	root: {
		base: 'h-full',
		collapsed: {
			on: 'w-16',
			off: 'w-64',
		},
		inner:
			'h-full overflow-y-auto overflow-x-hidden rounded bg-bg2_lm py-4 px-3 dark:bg-bg2_dm',
	},
	collapse: {
		button:
			'group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
		icon: {
			base: 'h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
			open: {
				off: '',
				on: 'text-gray-900',
			},
		},
		label: {
			base: 'ml-3 flex-1 whitespace-nowrap text-left',
			icon: {
				base: 'h-6 w-6 transition ease-in-out delay-0',
				open: {
					on: 'rotate-180',
					off: '',
				},
			},
		},
		list: 'space-y-2 py-2',
	},
	cta: {
		base: 'mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700',
		color: {
			blue: 'bg-cyan-50 dark:bg-cyan-900',
			dark: 'bg-dark-50 dark:bg-dark-900',
			failure: 'bg-red-50 dark:bg-red-900',
			gray: 'bg-alternative-50 dark:bg-alternative-900',
			green: 'bg-green-50 dark:bg-green-900',
			light: 'bg-light-50 dark:bg-light-900',
			red: 'bg-red-50 dark:bg-red-900',
			purple: 'bg-purple-50 dark:bg-purple-900',
			success: 'bg-green-50 dark:bg-green-900',
			yellow: 'bg-yellow-50 dark:bg-yellow-900',
			warning: 'bg-yellow-50 dark:bg-yellow-900',
		},
	},
	item: {
		base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-fg0_lm hover:bg-bg0_h_lm dark:text-fg0_dm dark:hover:bg-bg0_h_dm',
		active: 'bg-bg0_h_lm dark:bg-bg0_h_dm',
		collapsed: {
			insideCollapse: 'group w-full pl-8 transition duration-75',
			noIcon: 'font-bold',
		},
		content: {
			base: 'px-3 flex-1 whitespace-nowrap',
		},
		icon: {
			base: 'h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
			active: 'text-gray-700 dark:text-gray-100',
		},
		label: '',
		listItem: '',
	},
	items: {
		base: '',
	},
	itemGroup: {
		base: 'mt-4 space-y-2 border-t border-orange1_lm pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-orange1_dm',
	},
	logo: {
		base: 'mb-5 flex items-center pl-2.5',
		collapsed: {
			on: 'hidden',
			off: 'self-center whitespace-nowrap text-xl font-semibold dark:text-white',
		},
		img: 'mr-3 h-6 sm:h-7',
	},
}

export {
	textInputThemeConfig,
	buttonThemeConfig,
	navbarThemeConfig,
	footerThemeConfig,
	sidebarThemeConfig
}
