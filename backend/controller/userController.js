import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/errorHandler.js'
import User from '../models/userModel.js'

const test = (req, res) => {
	res.json({ message: 'backend working' })
}

const updateUser = async (req, res, next) => {
	if (req.user.id !== req.params.userId) {
		return next(
			errorHandler(403, 'Você não tem autorização para modificar esse usuário')
		)
	}
	if (req.body.password) {
		if (req.body.password.length < 6) {
			return next(errorHandler(400, 'Senha deve ter no mínimo 6 caracteres'))
		}
		req.body.password = bcryptjs.hashSync(req.body.password, 10)
	}
	if (req.body.username) {
		if (req.body.username.length < 7 || req.body.username.length > 20) {
			return next(
				errorHandler(400, 'O nome de usuário deve ser entre 7 e 20 caracteres')
			)
		}
		if (req.body.username.includes(' ')) {
			return next(
				errorHandler(400, 'O nome de usuário não deve conter espaços')
			)
		}
		if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
			return next(
				errorHandler(400, 'O nome de usuário deve ter apenas letras e números')
			)
		}
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					profilePicture: req.body.profilePicture,
					password: req.body.password,
				},
			},
			{ new: true }
		)
		const { password, ...rest } = updatedUser._doc
		res.status(200).json(rest)
	} catch (error) {
		next(error)
	}
}
const deleteUser = async (req, res, next) => {
	if (req.user.id !== req.params.userId) {
		return next(errorHandler(403, 'Você não pode deleter esse usuário'))
	}
	try {
		await User.findByIdAndDelete(req.params.userId)
		res.status(200).json('Usuário foi deletado')
	} catch (error) {
		next(error)
	}
}

const signOutUser = (req, res, next) => {
	try {
		res.clearCookie('access_token').status(200).json('O usuário foi deslogado')
	} catch (error) {
		next(error)
	}
}
const getUsers = async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(
			errorHandler(403, 'Você não tem permissão para ver os usuários')
		)
	}
	try {
		const startIndex = parseInt(req.query.startIndex) || 0
		const limit = parseInt(req.query.limit) || 9
		const sortDirection = req.query.sort === 'asc' ? 1 : -1

		const users = await User.find()
			.sort({ createdAt: sortDirection })
			.skip(startIndex)
			.limit(limit)

		const usersWithoutPassword = users.map((user) => {
			const { password, ...rest } = user._doc
			return rest
		})
		const totalUsers = await User.countDocuments()

		const now = new Date()

		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		)

		const lastMonthUsers = await User.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		})

		res.status(200).json({
			users: usersWithoutPassword,
			totalUsers,
			lastMonthUsers,
		})
	} catch (error) {
		next(error)
	}
}
const deleteUserAdmin = async (req, res, next) => {
	if (!req.user.isAdmin && req.user.id !== req.params.userId) {
		return next(errorHandler(403, 'Você não pode deleter esse usuário'))
	}
	try {
		await User.findByIdAndDelete(req.params.userId)
		res.status(200).json('Usuário foi deletado')
	} catch (error) {
		next(error)
	}
}

export { test, updateUser, deleteUser, signOutUser, getUsers, deleteUserAdmin }
