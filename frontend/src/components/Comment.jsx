/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/dist/locale/pt-br'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import {
	buttonThemeConfig,
	spanButtonThemeConfig,
	textareaThemeConfig,
} from '../configs/theme'
import { Button, Textarea } from 'flowbite-react'

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
	const [user, setUser] = useState({})
	const [isEditing, setIsEditing] = useState(false)
	const [editedContent, setEditedContent] = useState(comment.content)
	const { currentUser } = useSelector((state) => state.user)
	const handleEdit = () => {
		setIsEditing(true)
		setEditedContent(comment.content)
	}
	const handleSave = async () => {
		try {
			const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: editedContent,
				}),
			})
			if (res.ok) {
				setIsEditing(false)
				onEdit(comment, editedContent)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/user/${comment.userId}`)
				const data = await res.json()
				if (res.ok) {
					setUser(data)
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		getUser()
	}, [comment])
	return (
		<div className='flex p-4 text-sm border-2 border-orange0 rounded-xl mb-2 bg-bg2_lm dark:bg-bg2_dm shadow-md'>
			<div className='flex-shrink-0 mr-3'>
				<img
					className='w-10 h-10 rounded-full bg-gray0 mt-1'
					src={user.profilePicture}
					alt={user.username}
				/>
			</div>
			<div className='flex-1'>
				<div className='flex items-center mb-1 justify-between mr-2'>
					<span className='font-bold ml-1 text-xs truncate text-orange1_lm dark:text-orange1_dm'>
						{user ? `@${user.username}` : 'Usuário Anônimo'}
					</span>
					<span className='text-xs'>{moment(comment.createdAt).fromNow()}</span>
				</div>
				{isEditing ? (
					<>
						<Textarea
							theme={textareaThemeConfig}
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
						/>
						<div className='flex justify-end gap-2 text-xs mt-2'>
							<Button
								theme={buttonThemeConfig}
								type='button'
								size='sm'
								onClick={handleSave}
							>
								Salvar
							</Button>
							<Button
								theme={buttonThemeConfig}
								type='button'
								size='sm'
								outline
								onClick={() => setIsEditing(false)}
							>
								Cancelar
							</Button>
						</div>
					</>
				) : (
					<>
						<p className='whitespace-pre-wrap break-all border border-orange0 p-3 bg-bg0_h_lm dark:bg-bg0_h_dm shadow rounded-md max-h-40 overflow-scroll scrollbar scrollbar-track-fg2_dm scrollbar-thumb-orange0 dark:scrollbar-track-fg2_lm'>
							{comment.content}
						</p>
						<div className='flex items-center text-xs gap-1 text-end mt-2 ml-2'>
							<button
								type='button'
								onClick={() => onLike(comment._id)}
								className={`text-gray0 hover:text-orange1_lm hover:dark:text-orange1_dm ${
									currentUser &&
									comment.likes?.includes(currentUser._id) &&
									'!text-orange1_lm dark:!text-orange1_dm'
								}`}
							>
								<FaThumbsUp className='text-sm' />
							</button>
							<p className='mt-1'>
								{comment.numberOfLikes > 0 &&
									comment.numberOfLikes +
										' ' +
										(comment.numberOfLikes === 1 ? 'like' : 'likes')}
							</p>
							{currentUser &&
								(currentUser._id === comment.userId || currentUser.isAdmin) && (
									<>
										<button
											type='button'
											onClick={handleEdit}
											className={`${spanButtonThemeConfig} ml-1`}
										>
											Editar
										</button>
										<button
											type='button'
											onClick={() => onDelete(comment._id)}
											className={`${spanButtonThemeConfig} ml-1`}
										>
											Deletar
										</button>
									</>
								)}
						</div>
					</>
				)}
				
			</div>
		</div>
	)
}

export default Comment
