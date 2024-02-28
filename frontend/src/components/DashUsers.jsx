import { Button, Table, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	buttonThemeConfig,
	spanButtonThemeConfig,
	modalThemeConfig,
} from '../configs/theme'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'

const DashUsers = () => {
	const { currentUser } = useSelector((state) => state.user)
	const [users, setUsers] = useState([])
	const [showMore, setShowMore] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [userIdToDelete, setUserIdToDelete] = useState(null)
	const handleShowMore = async () => {
		const startIndex = users.length
		try {
			const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
			const data = await res.json()
			if (res.ok) {
				setUsers((prev) => [...prev, ...data.users])
				if (data.users.length < 9) {
					setShowMore(false)
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	const handleDeleteUser = async () => {
		setShowModal(false)
		console.log('tbd')
	}
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch(`api/user/getusers`)
				const data = await res.json()
				if (res.ok) {
					setUsers(data.users)
					if (data.users.length < 9) {
						setShowMore(false)
					}
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		if (currentUser.isAdmin) {
			fetchUsers()
		}
	})
	return (
		<div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-fg2_lm scrollbar-thumb-orange0 dark:scrollbar-track-fg2_dm'>
			{currentUser.isAdmin && users.length > 0 ? (
				<>
					<Table
						hoverable
						className='shadow-md'
					>
						<Table.Head>
							<Table.HeadCell>Data</Table.HeadCell>
							<Table.HeadCell>Imagem</Table.HeadCell>
							<Table.HeadCell>Nome de Usuário</Table.HeadCell>
							<Table.HeadCell>E-mail</Table.HeadCell>
							<Table.HeadCell>Admin</Table.HeadCell>
							<Table.HeadCell>Deletar</Table.HeadCell>
						</Table.Head>
						{users.map((user, index) => (
							<Table.Body
								key={index}
								className='divide-y'
							>
								<Table.Row>
									<Table.Cell>
										{new Date(user.createdAt).toLocaleString()}
									</Table.Cell>
									<Table.Cell>
										<img
											src={user.profilePicture}
											alt={user.username}
											className='w-10 h-10 object-cover bg-gray0 rounded-full shadow'
										/>
									</Table.Cell>
									<Table.Cell>{user.username}</Table.Cell>
									<Table.Cell>{user.email}</Table.Cell>
									<Table.Cell>
										{user.isAdmin ? (
											<FaCheck className='text-green1_lm dark:text-green1_dm' />
										) : (
											<FaTimes className='text-red1_lm dark:text-red1_dm' />
										)}
									</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true)
												setUserIdToDelete(user._id)
											}}
											className={spanButtonThemeConfig}
										>
											Deletar
										</span>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						))}
					</Table>
					{showMore && (
						<Button
							theme={buttonThemeConfig}
							className='w-full self-center py-1'
							onClick={handleShowMore}
						>
							Mostrar mais
						</Button>
					)}
				</>
			) : (
				<p className='mx-auto'>Você não possuiu nenhuma postagem</p>
			)}
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size='md'
				theme={modalThemeConfig}
				className=''
			>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='h-14 w-14 text-red1_lm dark:text-red1_dm mb-4 mx-auto' />
						<h3 className='mb-5 text-lg text-fg0_lm dark:text-fg0_dm'>
							Você realmente quer deletar esse post?
						</h3>
						<div className='flex justify-center gap-3'>
							<Button
								theme={buttonThemeConfig}
								color='failure'
								onClick={handleDeleteUser}
							>
								{'Sim, tenho certeza'}
							</Button>
							<Button
								theme={buttonThemeConfig}
								onClick={() => setShowModal(false)}
							>
								{'Não'}
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DashUsers
