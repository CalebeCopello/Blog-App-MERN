import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user)
	return (
		<div className='max-w-lg mx-auto p-3 w-full'>
			<h1 className='my-7 text-center font-bold text-3xl'>Profile</h1>
			<form className='flex flex-col gap-3'>
				<div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
					<img
						src={currentUser.profilePicture}
						alt='user'
						className='rounded-full w-full h-full border-4 border-orange1_lm dark:border-orange1_dm object-cover'
					/>
				</div>
				<TextInput
					theme={textInputThemeConfig}
					type='text'
					id='username'
					placeholder={currentUser.username}
					defaultValue={currentUser.username}
				/>
				<TextInput
					theme={textInputThemeConfig}
					type='text'
					id='email'
					placeholder={currentUser.email}
					defaultValue={currentUser.email}
				/>
				<TextInput
					theme={textInputThemeConfig}
					type='password'
					id='password'
					placeholder='password'
				/>
				<Button theme={buttonThemeConfig}>Update</Button>
			</form>
            <div className="text-red1_lm dark:text-red1_dm flex justify-between mt-5">
                <span className="cursor-pointer border rounded p-2 border-red0">Deletar Conta</span>
                <span className="cursor-pointer border rounded p-2 border-red0">Deslogar</span>
            </div>
		</div>
	)
}

export default DashProfile
