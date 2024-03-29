import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { sidebarThemeConfig } from '../configs/theme'
import {
	HiAnnotation,
	HiArrowSmLeft,
	HiChartPie,
	HiDocumentText,
	HiOutlineUserGroup,
	HiUser,
} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { signOutSuccess } from '../slices/userSlice'

const DashSidebar = () => {
	const { currentUser } = useSelector((state) => state.user)
	const location = useLocation()
	const dispatch = useDispatch()
	const [tab, setTab] = useState('')
	const handleSignOut = async () => {
		try {
			const res = await fetch('/api/user/signout', {
				method: 'POST',
			})
			const data = await res.json()
			if (!res.ok) {
				console.log(data.message)
			} else {
				dispatch(signOutSuccess())
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search)
		const tabFromUrl = urlParams.get('tab')
		if (tabFromUrl) {
			setTab(tabFromUrl)
		}
	}, [location.search])
	return (
		<Sidebar
			theme={sidebarThemeConfig}
			className='w-full md:w-56'
		>
			<Sidebar.Items>
				<Sidebar.ItemGroup className='flex flex-col gap-1'>
					<Link to='/dashboard?tab=profile'>
						<Sidebar.Item
							active={tab === 'profile'}
							icon={HiUser}
							label={currentUser.isAdmin ? 'Admin' : 'Usuário'}
							labelColor='dark'
							as='div'
						>
							Profile
						</Sidebar.Item>
					</Link>
					{currentUser && currentUser.isAdmin && (
						<>
							<Link to='/dashboard?tab=dash'>
								<Sidebar.Item
									active={tab === 'dash'}
									icon={HiChartPie}
									as='div'
								>
									DashBoard
								</Sidebar.Item>
							</Link>
							<Link to='/dashboard?tab=posts'>
								<Sidebar.Item
									active={tab === 'posts'}
									icon={HiDocumentText}
									as='div'
								>
									Posts
								</Sidebar.Item>
							</Link>
							<Link to='/dashboard?tab=users'>
								<Sidebar.Item
									active={tab === 'users'}
									icon={HiOutlineUserGroup}
									as='div'
								>
									Users
								</Sidebar.Item>
							</Link>
							<Link to='/dashboard?tab=comments'>
								<Sidebar.Item
									active={tab === 'comments'}
									icon={HiAnnotation}
									as='div'
								>
									Comentários
								</Sidebar.Item>
							</Link>
						</>
					)}
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup>
					<Sidebar.Item
						icon={HiArrowSmLeft}
						className='cursor-pointer'
						onClick={handleSignOut}
					>
						Deslogar
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}

export default DashSidebar
