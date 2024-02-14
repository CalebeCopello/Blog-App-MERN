import { Navbar, TextInput, Button } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

const Header = () => {
	const path = useLocation().pathname
	return (
		<Navbar className='border-b-2'>
			<Link
				to='/'
				className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold font-JetBrainsMono dark:text-fg0_lm:'
			>
				<span className='px-2 py-1 bg-orange0 rounded-lg text-fg0_dm shadow-md'>
					Calebe&#39;s
				</span>
				Blog
			</Link>
			{/* <DarkThemeToggle /> */}
			<form>
				<TextInput
					theme={{
						field: {
							input: {
								base: 'focus:!ring-orange1_dm focus:!border-orange1_dm',
							},
						},
					}}
					type='text'
					color={'gray'}
					placeholder='Procurar...'
					rightIcon={AiOutlineSearch}
					shadow
					className='hidden lg:inline'
				/>
			</form>
			<Button
				className='w-12 h-10'
				color='gray'
				pill
			>
				<AiOutlineSearch />
			</Button>
			<div className='flex gap-2 md:order-2'>
				<Button
					className='w-12 h-10 hidden sm:inline'
					color='gray'
					pill
				>
					<FaMoon />
				</Button>
				<Link to='/sign-in'>
					<Button color='gray'>Cadastrar-se</Button>
				</Link>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link active={path == '/'}>
					<Link to='/'>Home</Link>
				</Navbar.Link>
				<Navbar.Link active={path == '/about'}>
					<Link to='/about'>Sobre</Link>
				</Navbar.Link>
				<Navbar.Link active={path == '/projects'}>
					<Link to='/projects'>Projetos</Link>
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header