import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	HiAnnotation,
	HiArrowNarrowUp,
	HiDocumentText,
	HiOutlineUserGroup,
} from 'react-icons/hi'
import { Button, Table } from 'flowbite-react'
import { buttonThemeConfig, tableThemeConfig } from '../configs/theme'
import { Link } from 'react-router-dom'

const DashboardComponent = () => {
	const [users, setUsers] = useState([])
	const [comments, setComments] = useState([])
	const [posts, setPosts] = useState([])
	const [totalUsers, setTotalUsers] = useState(0)
	const [totalPosts, setTotalPosts] = useState(0)
	const [totalComments, setTotalComments] = useState(0)
	const [lastMonthUsers, setLastMonthUsers] = useState(0)
	const [lastMonthPosts, setLastMonthPosts] = useState(0)
	const [lastMonthComments, setLastMonthComments] = useState(0)
	const { currentUser } = useSelector((state) => state.user)
	useEffect(() => {
		const fetchUsers = async (n) => {
			try {
				const res = await fetch(`/api/user/getusers?limit=${n}`)
				const data = await res.json()
				if (res.ok) {
					setUsers(data.users)
					setTotalUsers(data.totalUsers)
					setLastMonthUsers(data.lastMonthUsers)
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		const fetchPosts = async (n) => {
			try {
				const res = await fetch(`/api/post/getposts?limit=${n}`)
				const data = await res.json()
				if (res.ok) {
					setPosts(data.posts)
					setTotalPosts(data.totalPosts)
					setLastMonthPosts(data.lastMonthPosts)
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		const fetchComments = async (n) => {
			try {
				const res = await fetch(`/api/comment/getcomments?limit=${n}`)
				const data = await res.json()
				if (res.ok) {
					setComments(data.comments)
					setTotalComments(data.totalComments)
					setLastMonthComments(data.lastMonthComments)
				}
			} catch (error) {
				console.log(error.message)
			}
		}

		if (currentUser.isAdmin) {
			fetchUsers(5)
			fetchPosts(5)
			fetchComments(5)
		}
	}, [currentUser])
	return (
		<div className='p-3 md:mx-auto'>
			<div className='flex flex-wrap gap-4 justify-center'>
				<div className='flex flex-col p-3 border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray1 text-md uppercase'>
								Total de Usuários
							</h3>
							<p className='text-2xl'>{totalUsers}</p>
						</div>
						<HiOutlineUserGroup className='bg-green0 text-bg0_lm rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex gap-2 text-sm'>
						<span className='text-green1_lm dark:text-green1_dm flex items-center'>
							<HiArrowNarrowUp />
							{lastMonthUsers}
						</span>
						<div className='text-gray0'>Ultímo mês</div>
					</div>
				</div>
				<div className='flex flex-col p-3 border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray1 text-md uppercase'>
								Total de Comentários
							</h3>
							<p className='text-2xl'>{totalComments}</p>
						</div>
						<HiAnnotation className='bg-blue0 text-bg0_lm rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex gap-2 text-sm'>
						<span className='text-green1_lm dark:text-green1_dm flex items-center'>
							<HiArrowNarrowUp />
							{lastMonthComments}
						</span>
						<div className='text-gray0'>Ultímo mês</div>
					</div>
				</div>
				<div className='flex flex-col p-3 border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray1 text-md uppercase'>Total de Posts</h3>
							<p className='text-2xl'>{totalPosts}</p>
						</div>
						<HiDocumentText className='bg-aqua0 text-bg0_lm rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex gap-2 text-sm'>
						<span className='text-green1_lm dark:text-green1_dm flex items-center'>
							<HiArrowNarrowUp />
							{lastMonthPosts}
						</span>
						<div className='text-gray0'>Ultímo mês</div>
					</div>
				</div>
			</div>
			<div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
				<div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm'>
					<div className=' flex justify-between p-3 text-sm font-semibold'>
						<h2 className='text-center p-2'>Usuários Recentes</h2>
						<Button
							size='xs'
							theme={buttonThemeConfig}
						>
							<Link to={'/dashboard?tab=users'}>Ver todos</Link>
						</Button>
					</div>
					<Table
						hoverable
						className='shadow-md'
						theme={tableThemeConfig}
						striped
					>
						<Table.Head>
							<Table.HeadCell>Imagem</Table.HeadCell>
							<Table.HeadCell>Username</Table.HeadCell>
						</Table.Head>
						<Table.Body className='divide-y'>
							{users &&
								users.map((user) => (
									<Table.Row
										key={user._id}
										className='border-orange0'
									>
										<Table.Cell>
											<img
												src={user.profilePicture}
												alt={user.username}
												className='w-10 h-10 rounded-full'
											/>
										</Table.Cell>
										<Table.Cell>{user.username}</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
				</div>
				<div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm'>
					<div className=' flex justify-between p-3 text-sm font-semibold'>
						<h2 className='text-center p-2'>Comentários Recentes</h2>
						<Button
							size='xs'
							theme={buttonThemeConfig}
						>
							<Link to={'/dashboard?tab=comments'}>Ver todos</Link>
						</Button>
					</div>
					<Table
						hoverable
						className='shadow-md'
						theme={tableThemeConfig}
						striped
					>
						<Table.Head>
							<Table.HeadCell>Comentário</Table.HeadCell>
							<Table.HeadCell>Likes</Table.HeadCell>
						</Table.Head>
						<Table.Body className='divide-y'>
							{comments &&
								comments.map((comment) => (
									<Table.Row
										key={comment._id}
										className='border-orange0'
									>
										<Table.Cell className='w-96'>
											<p className='line-clamp-2'>{comment.content}</p>
										</Table.Cell>
										<Table.Cell>{comment.numberOfLikes}</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
				</div>
				<div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-orange0 bg-bg0_h_lm dark:bg-bg0_h_dm'>
					<div className=' flex justify-between p-3 text-sm font-semibold'>
						<h2 className='text-center p-2'>Posts Recentes</h2>
						<Button
							size='xs'
							theme={buttonThemeConfig}
						>
							<Link to={'/dashboard?tab=posts'}>Ver todos</Link>
						</Button>
					</div>
					<Table
						hoverable
						className='shadow-md'
						theme={tableThemeConfig}
						striped
					>
						<Table.Head>
							<Table.HeadCell>Imagem</Table.HeadCell>
							<Table.HeadCell>Título</Table.HeadCell>
							<Table.HeadCell>Categoria</Table.HeadCell>
						</Table.Head>
						<Table.Body className='divide-y'>
							{posts &&
								posts.map((post) => (
									<Table.Row
										key={post._id}
										className='border-orange0'
									>
										<Table.Cell>
											<img
												src={post.image}
												alt={post.title}
												className='w-14 h-10 rounded-md'
											/>
										</Table.Cell>
										<Table.Cell className='line-clamp-3 w-96 h-20'>{post.title}</Table.Cell>
										<Table.Cell className='w-59'>{post.category}</Table.Cell>
									</Table.Row>
								))}
						</Table.Body>
					</Table>
				</div>
			</div>
		</div>
	)
}

export default DashboardComponent
