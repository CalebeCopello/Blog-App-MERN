import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import {
	buttonThemeConfig,
	fileInputThemeConfig,
	selectThemeConfig,
	textInputThemeConfig,
} from '../configs/theme.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const CreatePost = () => {
	const [file, setFile] = useState(null)
	const [imageUploadProgress, setImageUploadProgress] = useState(null)
	const [imageUploadError, setImageUploadError] = useState(null)
	const [formData, setFormData] = useState({})
	const handleUploadImage = async () => {
		try {
			if (!file) {
				setImageUploadError('Escolha uma imagem')
				return
			}
			setImageUploadError(null)
			const storage = getStorage(app)
			const fileName = new Date().getTime() + '-' + file.name
			const storageRef = ref(storage, fileName)
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setImageUploadProgress(progress.toFixed(0))
				},
				(error) => {
					setImageUploadError(error)
					setImageUploadProgress(null)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImageUploadProgress(null)
						setImageUploadError(null)
						setFormData({ ...formData, image: downloadURL })
					})
				}
			)
		} catch (error) {
			setImageUploadError('Upload da imagem falhou')
			setImageUploadProgress(null)
			console.log(error)
		}
	}
	return (
		<div className='p-3 max-w-3xl mx-auto min-h-screen'>
			<h1 className='text-center text-3xl my-7 font-semibold'>CreatePost</h1>
			<form className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4 sm:flex-row justify-between'>
					<TextInput
						theme={textInputThemeConfig}
						type='text'
						placeholder='Título do Post'
						required
						id='title'
						className='flex-1'
					/>
					<Select
						className='flex-1'
						theme={selectThemeConfig}
					>
						<option value='uncategorized'>Sem categoria</option>
						<option value='javascript'>JavaScript</option>
						<option value='reactjs'>ReactJS</option>
						<option value='nodejs'>NodeJS</option>
					</Select>
				</div>
				<div className='flex gap-4 items-center justify-between border rounded-sm border-orange1_lm dark:border-orange1_dm border-dashed p-3 shadow'>
					<FileInput
						theme={fileInputThemeConfig}
						type='file'
						accept='image/*'
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						theme={buttonThemeConfig}
						size='sm'
						onClick={handleUploadImage}
						disabled={imageUploadProgress}
					>
						{imageUploadProgress ? (
							<div className='w-16 h-16'>
								<CircularProgressbar
									value={imageUploadProgress}
									text={`${imageUploadProgress || 0}%`}
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
											stroke: `rgba(214,93,14,${imageUploadProgress / 100})`,
										},
										text: {
											fill: 'rgba(255,255,255,0.5)',
										},
									}}
								/>
							</div>
						) : (
							'Carregar Imagem'
						)}
					</Button>
				</div>
				{imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
				{formData.image && (
					<img
						src={formData.image}
						alt='upload'
						className='w-full h-72 object-cover'
					/>
				)}
				<ReactQuill
					theme='snow'
					placeholder='Escreva algo...'
					className='h-72 mb-12 ring-transparent'
					required
				/>
				<Button
					type='submit'
					theme={buttonThemeConfig}
				>
					Publicar
				</Button>
			</form>
		</div>
	)
}

export default CreatePost
