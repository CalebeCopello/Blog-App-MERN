import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../slices/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({})
	const { loading, error: errorMessage } = useSelector((state) => state.user)
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!formData.email || !formData.password) {
			return dispatch(signInFailure('Preencha todos os campos'))
		}
		try {
			dispatch(signInStart())
			const res = await fetch('/api/auth/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})
			const data = await res.json()
			if (data.success === false) {
				return dispatch(signInFailure(data.message))
			}
			if (res.ok) {
				dispatch(signInSuccess(data))
				navigate('/')
			}
		} catch (error) {
			dispatch(signInFailure(error.message))
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
							Esse é um projeto piloto. Você pode logar-se com o seu email ou
							com sua conta Google.
						</p>
					</div>
					<div className='flex-1'>
						<form
							className='flex flex-col gap-3'
							onSubmit={handleSubmit}
						>
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
									'Logar'
								)}
							</Button>
							<OAuth />
						</form>
						<div className='flex gap-3 text-sm mt-3'>
							<span>Ainda não tem uma conta?</span>
							<Link
								to='/signup'
								className='text-orange0 hover:text-orange1_lm'
							>
								Cadastrar-se
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

export default SignIn
