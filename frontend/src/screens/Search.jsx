import { TextInput, Label, Select, Button, Spinner } from 'flowbite-react'
import {
	buttonThemeConfig,
	selectThemeConfig,
	textInputThemeConfig,
} from '../configs/theme'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

function Search() {
	const location = useLocation()
	const navigate = useNavigate()
	const [sidebarData, setSidebarData] = useState({
		searchTerm: '',
		order: 'desc',
		category: 'uncategorized',
	})
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [showMore, setShowMore] = useState(false)

	const handleChange = (e) => {
		if (e.target.id === 'searchTerm') {
			setSidebarData({ ...sidebarData, searchTerm: e.target.value })
		}
		if (e.target.id === 'order') {
			const order = e.target.value || 'desc'
			setSidebarData({ ...sidebarData, order })
		}
		if (e.target.id === 'category') {
			const category = e.target.value || 'uncategorized'
			setSidebarData({ ...sidebarData, category })
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const urlParams = new URLSearchParams(location.search)
		urlParams.set('searchTerm', sidebarData.searchTerm)
		urlParams.set('order', sidebarData.order)
		urlParams.set('category', sidebarData.category)
		const searchQuery = urlParams.toString()
		navigate(`/search?${searchQuery}`)
	}
	const handleShowMore = async () => {
		const numberOfPosts = posts.length
		const startIndex = numberOfPosts
		const urlParams = new URLSearchParams(location.search)
		urlParams.set('startIndex', startIndex)
		const searchQuery = urlParams.toString()
		const res = await fetch(`/api/post/getposts?${searchQuery}`)
		if (!res.ok) {
			return
		}
		if (res.ok) {
			const data = await res.json()
			setPosts([...posts, ...data.posts])
			if (data.posts.length === 9) {
				setShowMore(true)
			}
			else {
				setShowMore(false)
			}
		}
	}
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const searchTermFromUrl = urlParams.get('searchTerm')
		const sortFromUrl = urlParams.get('order')
		const categoryFromUrl = urlParams.get('category')
		if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
			setSidebarData({
				...sidebarData,
				searchTerm: searchTermFromUrl,
				order: sortFromUrl,
				category: categoryFromUrl,
			})
		}

		const fetchPosts = async () => {
			setLoading(true)
			const searchQuery = urlParams.toString()
			const res = await fetch(`/api/post/getposts?${searchQuery}`)
			if (!res.ok) {
				setLoading(false)
				return
			}
			if (res.ok) {
				const data = await res.json()
				setPosts(data.posts)
				setLoading(false)
				if (data.posts.length === 9) {
					setShowMore(true)
				} else {
					setShowMore(false)
				}
			}
		}
		fetchPosts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search])
	console.log(posts)
	return (
		<div className='flex flex-col md:flex-row'>
			<div className='p-7 md:border-r-4 md:min-h-screen border-orange1_lm dark:border-orange1_dm'>
				<form
					action='flex flex-col gap-8'
					onSubmit={handleSubmit}
				>
					<div className='flex items-center gap-2'>
						<Label
							htmlFor='termo para procura'
							value='Termo:'
							className='text-bg0_dm dark:text-bg0_lm'
						/>
						<TextInput
							type='text'
							theme={textInputThemeConfig}
							placeholder='Procurar...'
							id='searchTerm'
							value={sidebarData.searchTerm || ''}
							onChange={handleChange}
						/>
					</div>
					<div className='flex items-center gap-2 mt-2'>
						<Label
							htmlFor='ordem de procura'
							value='Ordem:'
							className='text-bg0_dm dark:text-bg0_lm'
						/>
						<Select
							theme={selectThemeConfig}
							onChange={handleChange}
							value={sidebarData.order || 'desc'}
							id='order'
							className='w-full'
						>
							<option value='desc'>Mais Novos</option>
							<option value='asc'>Mais Antigos</option>
						</Select>
					</div>
					<div className='flex items-center gap-2 mt-2'>
						<Label
							htmlFor='categoria para procura'
							value='Categoria:'
							className='text-bg0_dm dark:text-bg0_lm'
						/>
						<Select
							theme={selectThemeConfig}
							onChange={handleChange}
							value={sidebarData.category || 'uncategorized'}
							id='category'
							className='w-full'
						>
							<option value='uncategorized'>Uncategorized</option>
							<option value='reactjs'>ReactJS</option>
							<option value='nodejs'>NodeJS</option>
							<option value='javascript'>JavaScript</option>
						</Select>
					</div>
					<Button
						className='mt-3 mx-auto w-full'
						theme={buttonThemeConfig}
						type='submit'
					>
						Aplicar filtros
					</Button>
				</form>
			</div>
			<div className='w-full'>
				<h1 className='text-3xl font-semibold sm:border-b border-orange0 p-3 mt-5'>
					Resultado:
				</h1>
				<div className='p-7 flex flex-wrap gap-4'>
					{!loading && posts.length === 0 ? (
						<p className='text-xl text-gray0'>{'Nenhum Post encontrado :('}</p>
					) : (
						posts.map((post) => (
							<PostCard
								key={post._id}
								post={post}
							/>
						))
					)}
					{loading && (
						<>
							<p className='text-xl text-gray0'>Carregando</p>
							<Spinner className='text-orange0 fill-gray0' />
						</>
					)}
					{showMore && <Button theme={buttonThemeConfig} className='w-full' onClick={handleShowMore}>Mostrar mais</Button>}
				</div>
			</div>
		</div>
	)
}

export default Search
