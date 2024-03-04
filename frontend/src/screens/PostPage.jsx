import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { buttonThemeConfig } from '../configs/theme'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

function PostPage() {
	const { postSlug } = useParams()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [post, setPost] = useState(null)
	const [recentPosts, setRecentPosts] = useState(null)
	useEffect(() => {
		const fetchPost = async () => {
			try {
				setLoading(true)
				const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
				const data = await res.json()
				if (!res.ok) {
					setLoading(false)
					setError(true)
					return
				}
				if (res.ok) {
					setPost(data.posts[0])
					setError(false)
					setLoading(false)
				}
			} catch (error) {
				setLoading(false)
				setError(true)
			}
		}
		fetchPost()
	}, [postSlug])

	useEffect(() => {
		try {
			const fetchRecentPosts = async (n) => {
				const res = await fetch(`/api/post/getposts?limit=${n}`)
				const data = await res.json()
				if (res.ok) {
					setRecentPosts(data.posts)
				}
			}
			fetchRecentPosts(3)
		} catch (error) {
			console.log(error.message)
		}
	}, [])
	if (loading)
		return (
			<div className='flex justify-center items-center min-h-screen'>
				{' '}
				<Spinner
					className='fill-orange0'
					size='xl'
				/>
			</div>
		)
	return (
		<>
			<main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
				<h1 className='text-3xl mt-10 p-3 text-center font-YoungSerif max-w-2xl mx-auto lg:text-4xl'>
					{post && post.title}
				</h1>
				<Link
					to={`/search?category=${post && post.category}`}
					className='self-center mt-5'
				>
					<Button
						theme={buttonThemeConfig}
						pill
						size='xs'
					>
						{post && post.category}
					</Button>
				</Link>
				<img
					src={post && post.image}
					alt={post && post.title}
					className='mt-10 p-3 max-h-[600px] w-full object-cover bg-bg0_h_lm'
				/>
				<div className='flex justify-between p-3 border-b border-orange0 mx-auto w-full max-w-2xl text-xs'>
					<span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
					<span className='italic'>
						{post && (post.content.length / 1000).toFixed(0) > 1
							? (post.content.length / 1000).toFixed(0) + 'minuto(s) de leitura'
							: 'menos de 1 minuto de leitura'}
					</span>
				</div>
				<div
					className='p-3 max-w-2xl mx-auto w-full post-content'
					dangerouslySetInnerHTML={{ __html: post && post.content }}
				></div>
				<CommentSection postId={post._id} />
			</main>
			<div className='flex flex-col justify-center items-center mb-5'>
				<h2 className='text-xl mt-5 font-YoungSerif'>Artigos recentes</h2>
				<div className='flex flex-wrap gap-5 mt-5 justify-center'>
					{recentPosts &&
						recentPosts.map((post) => (
							<PostCard
								key={post._id}
								post={post}
							/>
						))}
				</div>
			</div>
		</>
	)
}

export default PostPage
