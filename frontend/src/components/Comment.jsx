/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/dist/locale/pt-br'

moment().locale('pt-br')
const Comment = ({ comment }) => {
	const [user, setUser] = useState({})

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
		if (comment.userId) {
			getUser()
		}
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
			</div>
		</div>
	)
}

export default Comment
