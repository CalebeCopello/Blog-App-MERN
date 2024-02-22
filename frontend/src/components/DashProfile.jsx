import { Alert, Button, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
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
import { updateStart, updateSuccess, updateFailure } from '../slices/userSlice'

const DashProfile = () => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector((state) => state.user)
	const [imageFile, setImageFile] = useState(null)
	const [imageFileUrl, setImageFileUrl] = useState(null)
	const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0)
	const [imageFileUploadError, setImageFileUploadError] = useState(null)
	const [imageFileUploading, setImageFileUploading] = useState(false)
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
	const [updateUserError, setUpdateUserError] = useState(null)
	const [formData, setFormData] = useState({})
	const filePickerRef = useRef()
	const handleImageUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImageFile(file)
			setImageFileUrl(URL.createObjectURL(file))
		}
	}
	const uploadImage = async () => {
		setImageFileUploading(true)
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
				setImageFileUploading(false)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageFileUrl(downloadURL)
					setFormData({ ...formData, profilePicture: downloadURL })
					setImageFileUploading(false)
				})
			}
		)
	}
	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}
	const handleFormSubmit = async (e) => {
		e.preventDefault()
		setUpdateUserError(null)
		setUpdateUserSuccess(null)
		if (Object.keys(formData).length === 0) {
			setUpdateUserError('Nenhuma mudança foi feita')
			return
		}
		if (imageFileUploading) {
			setUpdateUserError('Espere o upload da imagem')
			return
		}
		try {
			dispatch(updateStart())
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			const data = await res.json()
			if (!res.ok) {
				dispatch(updateFailure(data.message))
				setUpdateUserError(data.message)
			} else {
				dispatch(updateSuccess(data))
				setUpdateUserSuccess('As informações foram atualizadas com sucesso')
			}
		} catch (error) {
			dispatch(updateFailure(error.message))
			setUpdateUserError(error.message)
		}
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
			<form
				onSubmit={handleFormSubmit}
				className='flex flex-col gap-3'
			>
				<input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
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
					onChange={handleFormChange}
				/>
				<TextInput
					theme={textInputThemeConfig}
					type='text'
					id='email'
					placeholder={currentUser.email}
					defaultValue={currentUser.email}
					onChange={handleFormChange}
				/>
				<TextInput
					theme={textInputThemeConfig}
					type='password'
					id='password'
					placeholder='password'
					onChange={handleFormChange}
				/>
				<Button
					type='submit'
					theme={buttonThemeConfig}
				>
					Update
				</Button>
			</form>
			<div className='text-red1_lm dark:text-red1_dm flex justify-between mt-5'>
				<span className='cursor-pointer border rounded p-2 border-red0'>
					Deletar Conta
				</span>
				<span className='cursor-pointer border rounded p-2 border-red0'>
					Deslogar
				</span>
			</div>
			{updateUserSuccess && (
				<Alert
					color='success'
					className='mt-5'
				>
					{updateUserSuccess}
				</Alert>
			)}
			{updateUserError && (
				<Alert
					color='failure'
					className='mt-5'
				>
					{updateUserError}
				</Alert>
			)}
		</div>
	)
}

export default DashProfile
