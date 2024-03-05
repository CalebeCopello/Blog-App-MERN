import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { Button } from 'flowbite-react'
import { buttonThemeConfig } from '../configs/theme'

const Home = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(`/api/post/getposts`)
			const data = await res.json()
			setPosts(data.posts)
		}
		fetchPosts()
	}, [])
	return (
		<>
			<div className=''>
				<div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto'>
					<h1 className='font-YoungSerif text-3xl lg:text-6xl'>
						Bem-vindo ao meu Blog
					</h1>
					<p className='text-gray3_lm dark:text-gray3_dm text-xs sm:text-sm'>
						Aqui você irá encontrar alguns artigos e tutoriais sobre
						desenvolvimento Web e Linguages de programação
					</p>
					<Link
						to='/search'
						className='text-xs sm:text-sm text-orange0 font-bold hover:underline'
					>
						Ver todos os Posts
					</Link>
				</div>
				<div className='max-w-screen-2xl mx-auto p-3 flex flex-col gap-8 py-7'>
					{posts && posts.length > 0 && (
						<div className='flex flex-col gap-6'>
							<h2 className='text-2xl font-semibold text-center'>
								Postagens recentes
							</h2>
							<div className=' flex flex-wrap gap-4 justify-center items-center'>
								{posts.map((post) => (
									<PostCard
										key={post._id}
										post={post}
									/>
								))}
							</div>
							<div className=' flex justify-center items-center'>
								<Button
								size='xs'
								pill
								theme={buttonThemeConfig}
								>
									<Link
										to='/search'
										className=''
									>
										Ver todos os Posts
									</Link>
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Home
