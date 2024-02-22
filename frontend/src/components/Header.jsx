import {
	Navbar,
	TextInput,
	Button,
	Dropdown,
	Avatar,
	DarkThemeToggle,
} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
// import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../slices/themeSlice'
import {
	buttonThemeConfig,
	textInputThemeConfig,
	navbarThemeConfig,
} from '../configs/theme.js'

const Header = () => {
	const path = useLocation().pathname
	const dispatch = useDispatch()
	const { currentUser } = useSelector((state) => state.user)
	// const { theme } = useSelector((state) => state.theme)
	return (
		<Navbar
			theme={navbarThemeConfig}
			className='border-b-2'
		>
			<Link
				to='/'
				className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold font-JetBrainsMono dark:text-fg0_lm:'
			>
				<span className='px-2 py-1 bg-orange0 rounded-lg text-fg0_dm shadow-md'>
					Calebe&#39;s
				</span>
				Blog
			</Link>
			<form>
				<TextInput
					theme={textInputThemeConfig}
					type='text'
					placeholder='Procurar...'
					rightIcon={AiOutlineSearch}
					shadow
					className='hidden lg:inline'
				/>
			</form>
			<Button
				theme={buttonThemeConfig}
				className='w-12 h-10 lg:hidden'
				pill
			>
				<AiOutlineSearch />
			</Button>
			<div className='flex gap-2 md:order-2'>
				<div
					className=''
					onClick={() => dispatch(toggleTheme())}
				>
					<DarkThemeToggle />
				</div>
				{/* 
				//NOTE: old theme function
				<Button
					theme={buttonThemeConfig}
					className='w-12 h-10 hidden sm:inline'
					pill
					onClick={() => dispatch(toggleTheme())}
				>
					{theme === 'light' ? <FaMoon /> : <FaSun />}
				</Button> */}
				{currentUser ? (
					<Dropdown
						className='bg-bg0_h_lm dark:bg-bg1_dm'
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt='user'
								img={currentUser.profilePicture}
								rounded
							/>
						}
					>
						<Dropdown.Header>
							<span className='block text-sm'>@{currentUser.username}</span>
							<span className='block text-sm font-medium truncate'>
								{currentUser.email}
							</span>
						</Dropdown.Header>
						<Dropdown.Header>
							<Link to={'/dashboard?tab=profile'}>
								<Dropdown.Item>Profile</Dropdown.Item>
							</Link>
							<Dropdown.Divider />
							<Dropdown.Item>Deslogar</Dropdown.Item>
						</Dropdown.Header>
					</Dropdown>
				) : (
					<>
						<Link to='/signup'>
							<Button theme={buttonThemeConfig}>Cadastrar-se</Button>
						</Link>
					</>
				)}
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link
					active={path == '/'}
					as={'div'}
				>
					<Link to='/'>Home</Link>
				</Navbar.Link>
				<Navbar.Link
					active={path == '/about'}
					as={'div'}
				>
					<Link to='/about'>Sobre</Link>
				</Navbar.Link>
				<Navbar.Link
					active={path == '/projects'}
					as={'div'}
				>
					<Link to='/projects'>Projetos</Link>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header
