import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'

const SignUp = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({})
	const [errorMessage, setErrorMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
		console.log(formData)
		setErrorMessage(null)
	}
	console.log(formData)
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!formData.username || !formData.email || !formData.password) {
			return setErrorMessage('Preencha todos os campos')
		}
		try {
			setLoading(true)
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})
			const data = await res.json()
			if (data.success === false) {
				return setErrorMessage(data.message)
			}
			if(res.ok) {
				navigate('/signin')
			}
		} catch (error) {
			setErrorMessage(error.message)
		} finally {
			setLoading(false)
		}
	}
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
						<form
							className='flex flex-col gap-3'
							onSubmit={handleSubmit}
						>
							<div>
								<Label value='Nome de usuário' />
								<TextInput
									onChange={handleChange}
									type='text'
									placeholder='Username'
									id='username'
									required
									shadow
									addon='@'
								/>
							</div>
							<div>
								<Label value='E-mail' />
								<TextInput
									onChange={handleChange}
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
									onChange={handleChange}
									type='password'
									placeholder='Password'
									id='password'
									required
									shadow
								/>
							</div>
							<Button
								type='submit'
								disabled={loading}
							>
								{loading ? (
									<>
										<Spinner size='sm' />{' '}
										<span className='pl-3'>Carregando</span>
									</>
								) : (
									'Cadastrar'
								)}
							</Button>
						</form>
						<div className='flex gap-3 text-sm mt-3'>
							<span>Já tem uma conta?</span>
							<Link
								to='/signin'
								className='text-orange0 hover:text-orange1_lm'
							>
								Logar-se
							</Link>
						</div>
						{errorMessage && (
							<Alert
								className='mt-5'
								color='failure'
							>
								{' '}
								{errorMessage}{' '}
							</Alert>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
