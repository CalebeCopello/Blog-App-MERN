import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

const SignUp = () => {
	return (
		<>
			<div className='min-h-screen mt-20 '>
				<div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7'>
					<div className='flex-1'>
						{' '}
						<Link
							to='/'
							className='text-4xl font-bold font-JetBrainsMono dark:text-fg0_lm:'
						>
							<span className='px-2 py-1 bg-orange0 rounded-lg text-fg0_dm shadow-md'>
								Calebe&#39;s
							</span>
							Blog
						</Link>
						<p className='text-sm mt-5'>
							Esse é um projeto piloto. Você pode cadastrar-se com o seu email
							ou com sua conta Google.
						</p>
					</div>
					<div className='flex-1'>
						<form className='flex flex-col gap-3'>
							<div>
								<Label value='Nome de usuário' />
								<TextInput
									type='text'
									placeholder='Username'
									id='Usuário'
									required
									shadow
								/>
							</div>
							<div>
								<Label value='E-mail' />
								<TextInput
									type='email'
									placeholder='nome@email.com'
									id='email'
									required
									shadow
								/>
							</div>
							<div>
								<Label value='Senha' />
								<TextInput
									type='password'
									placeholder='Password'
									id='password'
									required
									shadow
								/>
							</div>
							<Button type='submit'>Cadastrar</Button>
						</form>
						<div className='flex gap-3 text-sm mt-3'>
							<span>Já tem uma conta?</span>
							<Link
								to='/sign-in'
								className='text-orange0 hover:text-orange1_lm'
							>
								Logar-se
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
