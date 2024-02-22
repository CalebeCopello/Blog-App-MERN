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

export { test, updateUser }
