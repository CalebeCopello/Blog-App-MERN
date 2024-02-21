import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { buttonThemeConfig } from '../configs/theme.js'

const OAuth = () => {
	const auth = getAuth(app)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleGoogleOAuth = async () => {
		const provider = new GoogleAuthProvider()
		provider.setCustomParameters({ prompt: 'select_account' })
		try {
			const resultsFromGoogle = await signInWithPopup(auth, provider)
			const res = await fetch('/api/auth/google', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: resultsFromGoogle.user.displayName,
					email: resultsFromGoogle.user.email,
					googlePhotoURL: resultsFromGoogle.user.photoURL,
				}),
			})
			const data = await res.json()
			if (res.ok) {
				dispatch(signInSuccess(data))
				navigate('/')
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<Button
		theme={buttonThemeConfig}
			type='button'
			onClick={handleGoogleOAuth}
		>
			<AiFillGoogleCircle className='w-6 h-6 mr-2' />
			Use sua conta Google
		</Button>
	)
}

export default OAuth
