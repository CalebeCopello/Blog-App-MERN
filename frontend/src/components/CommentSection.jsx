import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Textarea } from 'flowbite-react'
import { buttonThemeConfig, textareaThemeConfig } from '../configs/theme'
import { useEffect, useState } from 'react'
import Comment from './Comment'

// eslint-disable-next-line react/prop-types
function CommentSection({ postId }) {
	const navigate = useNavigate()
	const { currentUser } = useSelector((state) => state.user)
	const [newComment, setNewComment] = useState(false)
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])
	const [commentError, setCommentError] = useState(null)
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (comment.length > 200) {
			return
		}
		try {
			const res = await fetch(`/api/comment/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					content: comment,
					postId,
					userId: currentUser._id,
				}),
			})
			const data = res.json()
			if (res.ok) {
				setComment('')
				setCommentError(null)
				setComments([data, ...comments])
				setNewComment(true)
			}
		} catch (error) {
			setCommentError(error.message)
		}
	}
	const handleLike = async (commentId) => {
		console.log(commentId)
		try {
			if (!currentUser) {
				navigate('/signin')
				return
			}
			const res = await fetch(`/api/comment/likecomment/${commentId}`, {
				method: 'PUT',
			})
			if (res.ok) {
				const data = await res.json()
				setComments(
					comments.map((comment) =>
						comment._id === commentId
							? {
									...comment,
									likes: data.likes,
									numberOfLikes: data.likes.length,
							}
							: comment
					)
				)
				console.log(data)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		const getComments = async () => {
			if (newComment) {
				setNewComment(false)
			}
			try {
				const res = await fetch(`/api/comment/getpostcomments/${postId}`)
				if (res.ok) {
					const data = await res.json()
					setComments(data)
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		getComments()
	}, [postId, newComment])
	return (
		<div className='max-w-2xl mx-auto w-full p-3'>
			{currentUser ? (
				<>
					{' '}
					<div className='flex item-center gap-1 my-5 text-fg0_lm dark:text-fg0_dm text-sm'>
						<p>Logado como:</p>{' '}
						<img
							className='h-5 w-5 object-cover rounded-full'
							src={currentUser.profilePicture}
							alt={currentUser.username}
						/>
						<Link
							className='text-xs mt-0.5 hover:underline text-orange1_lm dark:text-orange1_dm'
							to={'/dashboard?tab=profile'}
						>
							@{currentUser.username}
						</Link>
					</div>
				</>
			) : (
				<>
					<div className='text-sm flex gap-1'>
						Você precisa estar logado para comentar.
						<Link
							className='hover:underline text-orange1_lm dark:text-orange1_dm'
							to={'/signin'}
						>
							Logar-se
						</Link>
					</div>
				</>
			)}
			{currentUser && (
				<>
					<form
						onSubmit={handleSubmit}
						className='border p-3 rounded-md border-orange1_lm dark:border-orange1_dm bg-bg2_lm dark:bg-bg2_dm shadow-lg'
					>
						<Textarea
							theme={textareaThemeConfig}
							placeholder='Escreva seu comentário...'
							rows={3}
							maxLength={200}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							className='whitespace-pre-wrap'
						></Textarea>
						<div className='flex justify-between items-center mt-5'>
							<p>{200 - comment.length} caracter{200 - comment.length > 1 && 'es'} restante{200 - comment.length > 1 && 's'}.</p>
							<Button
								theme={buttonThemeConfig}
								type='submit'
							>
								Enviar
							</Button>
						</div>
						{commentError && <Alert color='failure'>{commentError}</Alert>}
					</form>
				</>
			)}
			{comments.length === 0 ? (
				<p className='text-sm my-5'>{'Nenhum comentário :('}</p>
			) : (
				<>
					<div className='text-sm my-5 flex items-center gap-1'>
						<p>Comentário{comments.length > 1 && 's'}:</p>
						<div className='border border-orange0 py-1 px-2 rounded-md bg-bg0_h_lm dark:bg-bg0_h_dm'>
							<p>{comments.length}</p>
						</div>
					</div>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							onLike={handleLike}
						/>
					))}
				</>
			)}
		</div>
	)
}

export default CommentSection
