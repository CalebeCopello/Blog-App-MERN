import { Button, Table, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	buttonThemeConfig,
	spanButtonThemeConfig,
	modalThemeConfig,
	tableThemeConfig,
} from '../configs/theme'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const DashComments = () => {
	const { currentUser } = useSelector((state) => state.user)
	const [comments, setComments] = useState(() => [])
	const [showMore, setShowMore] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [commentIdToDelete, setCommentIdToDelete] = useState(null)
	const handleShowMore = async () => {
		const startIndex = comments.length
		try {
			const res = await fetch(
				`/api/comment/getcomments?startIndex=${startIndex}`
			)
			const data = await res.json()
			if (res.ok) {
				setComments((prev) => [...prev, ...data.comments])
				if (data.comments.length < 9) {
					setShowMore(false)
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	const handleDeleteComment = async () => {
		setShowModal(false)
		try {
			const res = await fetch(
				`/api/comment/deletecomment/${commentIdToDelete}`,
				{
					method: 'DELETE',
				}
			)
			const data = await res.json()
			if (res.ok) {
				setComments((prev) =>
					prev.filter((comment) => comment._id !== commentIdToDelete)
				)
			} else {
				console.log(data.message)
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await fetch(`api/comment/getcomments`)
				const data = await res.json()
				if (res.ok) {
					setComments(data.comments)
					if (data.comments.length < 9) {
						setShowMore(false)
					}
				}
			} catch (error) {
				console.log(error.message)
			}
		}
		if (currentUser.isAdmin) {
			fetchComments()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser._id])
	return (
		<div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-fg2_dm scrollbar-thumb-orange0 dark:scrollbar-track-fg2_lm'>
			{currentUser.isAdmin && comments.length > 0 ? (
				<>
					<Table
						hoverable
						className='shadow-md'
						theme={tableThemeConfig}
						striped
					>
						<Table.Head>
							<Table.HeadCell>Data Atualizada</Table.HeadCell>
							<Table.HeadCell>Comentário</Table.HeadCell>
							<Table.HeadCell>Número de likes</Table.HeadCell>
							<Table.HeadCell>Post Id</Table.HeadCell>
							<Table.HeadCell>User Id</Table.HeadCell>
							<Table.HeadCell>Deletar</Table.HeadCell>
						</Table.Head>
						<Table.Body className='divide-y'>
							{comments.map((comment) => (
								<Table.Row
									key={comment._id}
									className='border-orange0'
								>
									<Table.Cell>
										{new Date(comment.updatedAt).toLocaleString()}
									</Table.Cell>
									<Table.Cell>{comment.content}</Table.Cell>
									<Table.Cell>{comment.numberOfLikes}</Table.Cell>
									<Table.Cell>{comment.postId}</Table.Cell>
									<Table.Cell>{comment.userId}</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true)
												setCommentIdToDelete(comment._id)
											}}
											className={spanButtonThemeConfig}
										>
											Deletar
										</span>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
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
				<p className='mx-auto'>Você não possuiu nenhuma comentário</p>
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
							Você realmente quer deletar esse comentário?
						</h3>
						<div className='flex justify-center gap-3'>
							<Button
								theme={buttonThemeConfig}
								color='failure'
								onClick={handleDeleteComment}
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

export default DashComments
