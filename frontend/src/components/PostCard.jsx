/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function PostCard({ post }) {
	return (
		<div className='group relative w-full bg-bg0_h_lm dark:bg-bg0_h_dm border border-orange1_lm dark:border-orange1_dm hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
			<Link to={`/post/${post.slug}`}>
				<img
					src={post.image}
					alt={post.title}
					className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 bg-bg0_h_lm'
				/>
			</Link>
			<div className='p-3 flex flex-col gap-2'>
				<p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
				<span className='italic text-sm'>{post.category}</span>
				<Link
					to={`/post/${post.slug}`}
					className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border  border-orange1_lm dark:border-orange1_dm bg-bg1_lm dark:bg-bg1_dm hover:bg-orange0 dark:hover:bg-orange0 hover:text-bg1_lm transition-all duration-300 text-center py-2 rounded-md m-2'
				>
					Ler Artigo
				</Link>
			</div>
		</div>
	)
}

export default PostCard
