import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/errorHandler.js'

const signup = async (req, res, next) => {
	const { username, email, password } = req.body
	const usernameTrimmed = username ? username.trim() : username
	const emailTrimmed = email ? email.trim().toLowerCase() : email
	const passwordTrimmed = password ? password.trim() : password
	if (
		!username ||
		!email ||
		!password ||
		usernameTrimmed === '' ||
		emailTrimmed === '' ||
		passwordTrimmed === ''
	) {
		next(errorHandler(400, 'Todos os campos devem ser preenchidos'))
	}
    const hashedPassword = bcryptjs.hashSync(password, 10)
	const newUser = new User({
		username: usernameTrimmed,
		email: emailTrimmed,
		password: hashedPassword
	})
	try {
		await newUser.save()
		res.json({ message: `${usernameTrimmed} cadastrado com sucesso!` })
	} catch (error) {
		// return res.status(500).json({ message: `Erro: ${error}` })
		next(error)
	}
}

export default signup
