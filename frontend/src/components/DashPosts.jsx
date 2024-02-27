import { Button, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { buttonThemeConfig, spanButtonThemeConfig } from '../configs/theme'

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user)
	const [userPosts, setUserPosts] = useState([])
	const [showMore, setShowMore] = useState(true)
	const handleShowMore = async () => {
		const startIndex = userPosts.length
		try {
			const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
			const data = await res.json()
			if (res.ok) {
				setUserPosts((prev) => [...prev, ...data.posts])
				if (data.posts.length < 9) {
					setShowMore(false)
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`api/post/getposts?userId=${currentUser._id}`)
				const data = await res.json()
				if (res.ok) {
					setUserPosts(data.posts)
					if(data.posts.length < 9) {
						setShowMore(false)
					}
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		if (currentUser.isAdmin) {
			fetchPosts()
		}
	}, [currentUser._id])
	return (
		<div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-fg2_lm scrollbar-thumb-orange0 dark:scrollbar-track-fg2_dm'>
			{currentUser.isAdmin && userPosts.length > 0 ? (
				<>
					<Table
						hoverable
						className='shadow-md'
					>
						<Table.Head>
							<Table.HeadCell>Data</Table.HeadCell>
							<Table.HeadCell>Imagem</Table.HeadCell>
							<Table.HeadCell>Título</Table.HeadCell>
							<Table.HeadCell>Categoria</Table.HeadCell>
							<Table.HeadCell>Deletar</Table.HeadCell>
							<Table.HeadCell>Editar</Table.HeadCell>
						</Table.Head>
						{userPosts.map((post, index) => (
							<Table.Body
								key={index}
								className='divide-y'
							>
								<Table.Row>
									<Table.Cell>
										{new Date(post.updatedAt).toLocaleString()}
									</Table.Cell>
									<Table.Cell>
										<Link to={`/post/${post.slug}`}>
											<img
												src={post.image}
												alt={post.title}
												className='w-20 h-10 object-cover bg-gray0'
											/>
										</Link>
									</Table.Cell>
									<Table.Cell>
										<Link to={`/post/${post.slug}`}>{post.title}</Link>
									</Table.Cell>
									<Table.Cell>{post.category}</Table.Cell>
									<Table.Cell>
										<span className={spanButtonThemeConfig}>Deletar</span>
									</Table.Cell>
									<Table.Cell>
										<Link to={`/update-post/${post._id}`}></Link>
										<span className={spanButtonThemeConfig}>Editar</span>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						))}
					</Table>
					{showMore && (
						<Button theme={buttonThemeConfig} className='w-full self-center py-1' onClick={handleShowMore}>Mostrar mais</Button>
					)}
				</>
			) : (
				<p className='mx-auto'>Você não possuiu nenhuma postagem</p>
			)}
		</div>
	)
}

export default DashPosts
