/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/dist/locale/pt-br'
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

moment().locale('pt-br')
const Comment = ({ comment, onLike }) => {
	const [user, setUser] = useState({})
	const { currentUser } = useSelector((state) => state.user)

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
		<div className='flex p-4 border-b border-orange0 text-sm'>
			<div className='flex-shrink-0 mr-3'>
				<img
					className='w-10 h-10 rounded-full bg-gray0'
					src={user.profilePicture}
					alt={user.username}
				/>
			</div>
			<div className='flex-1'>
				<div className='flex items-center mb-1'>
					<span className='font-bold mr-1 text-xs truncate text-orange1_lm dark:text-orange1_dm'>
						{user ? `@${user.username}` : 'Usuário Anônimo'}
					</span>
					<span className='text-xs'>{moment(comment.createdAt).fromNow()}</span>
				</div>
				<p className='pb-2 whitespace-pre-wrap'>{comment.content}</p>
				<div className='flex items-center pt-1 text-xs gap-2'>
					<button
						type='button'
						onClick={() => onLike(comment._id)}
						className={`text-gray0 hover:text-blue1_lm hover:dark:text-blue1_dm ${
							currentUser &&
							comment.likes?.includes(currentUser._id) &&
							'!text-blue1_lm dark:!text-blue1_dm'
						}`}
					>
						<FaThumbsUp className='text-sm' />
					</button>
					<p>{comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}</p>
				</div>
			</div>
		</div>
	)
}

export default Comment
