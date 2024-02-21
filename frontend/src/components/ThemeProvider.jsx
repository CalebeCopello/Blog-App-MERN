import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
	const { theme } = useSelector((state) => state.theme)
	return (
		<div className={theme}>
			<div className='bg-bg1_lm text-fg0_lm dark:text-fg0_dm dark:bg-bg1_dm min-h-screen'>
				{children}
			</div>
		</div>
	)
}
