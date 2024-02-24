import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import {
	buttonThemeConfig,
	fileInputThemeConfig,
	selectThemeConfig,
	textInputThemeConfig,
} from '../configs/theme.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const CreatePost = () => {
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
					/>
					<Button
						theme={buttonThemeConfig}
						size='sm'
					>
						Enviar uma imagem
					</Button>
				</div>
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
