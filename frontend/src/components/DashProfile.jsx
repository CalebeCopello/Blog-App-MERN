import { Alert, Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'
import { useEffect, useRef, useState } from 'react'
import {
	getStorage,
	uploadBytesResumable,
	ref,
	getDownloadURL,
} from 'firebase/storage'
import { app } from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user)
	const [imageFile, setImageFile] = useState(null)
	const [imageFileUrl, setImageFileUrl] = useState(null)
	const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
	const [imageFileUploadError, setImageFileUploadError] = useState(null)
	console.log(imageFileUploadProgress, imageFileUploadError)
	const filePickerRef = useRef()
	const handleImageUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImageFile(file)
			setImageFileUrl(URL.createObjectURL(file))
		}
	}
	const uploadImage = async () => {
		setImageFileUploadError(null)
		const storage = getStorage(app)
		const fileName = new Date().getTime() + imageFile.name
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, imageFile)
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setImageFileUploadProgress(progress.toFixed(0))
			},
			(error) => {
				setImageFileUploadError(
					`Não foi possivel enviar a imagem (Arquivo deve ter no máximo 2Mb)\n${error}`
				)
				setImageFileUploadProgress(0)
				setImageFile(null)
				setImageFileUrl(null)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageFileUrl(downloadURL)
				})
			}
		)
	}
	useEffect(() => {
		if (imageFile) {
			uploadImage()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageFile])
	return (
		<div className='max-w-lg mx-auto p-3 w-full'>
			<h1 className='my-7 text-center font-bold text-3xl'>Profile</h1>
			<form className='flex flex-col gap-3'>
				<input
					type='file'
					accept='image/*'
					onClick={handleImageUpload}
					ref={filePickerRef}
					hidden
				/>
				<div
					className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
					onClick={() => filePickerRef.current.click()}
				>
					<img
						src={imageFileUrl || currentUser.profilePicture}
						alt='user'
						className={`rounded-full w-full h-full border-4 border-orange1_lm dark:border-orange1_dm object-cover ${
							imageFileUploadProgress &&
							imageFileUploadProgress < 100 &&
							'filter blur-sm'
						}`}
					/>
					{imageFileUploadProgress && (
						<CircularProgressbar
							value={imageFileUploadProgress || 0}
							text={`${imageFileUploadProgress}%`}
							strokeWidth={3}
							styles={{
								root: {
									width: '100%',
									height: '100%',
									position: 'absolute',
									top: 0,
									left: 0,
								},
								path: {
									stroke: `rgba(214,93,14,${imageFileUploadProgress / 100})`,
								},
								text: {
									fill: 'rgba(214,93,14,0.5)',
								},
							}}
						/>
					)}
				</div>
				{imageFileUploadError && (
					<Alert color='failure'>{imageFileUploadError}</Alert>
				)}
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
			<div className='text-red1_lm dark:text-red1_dm flex justify-between mt-5'>
				<span className='cursor-pointer border rounded p-2 border-red0'>
					Deletar Conta
				</span>
				<span className='cursor-pointer border rounded p-2 border-red0'>
					Deslogar
				</span>
			</div>
		</div>
	)
}

export default DashProfile
