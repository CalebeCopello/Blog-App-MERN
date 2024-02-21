import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { sidebarThemeConfig } from '../configs/theme'
import { HiArrowSmLeft, HiUser } from 'react-icons/hi'
import { useSelector } from 'react-redux'

const DashSidebar = () => {
	const { currentUser } = useSelector((state) => state.user)
	const location = useLocation()
	const [tab, setTab] = useState('')
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
				<Sidebar.ItemGroup>
					<Link to='/dashboard?tab=profile'>
						<Sidebar.Item
							active={tab === 'profile'}
							icon={HiUser}
							label={currentUser.username}
							labelColor='dark'
							as='div'
						>
							Profile
						</Sidebar.Item>
					</Link>
				</Sidebar.ItemGroup>
				<Sidebar.ItemGroup>
					<Sidebar.Item
						icon={HiArrowSmLeft}
						className='cursor-pointer'
					>
						Deslogar
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}

export default DashSidebar
