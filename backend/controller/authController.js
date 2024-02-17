import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import errorHandler from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'

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
		password: hashedPassword,
	})
	try {
		await newUser.save()
		res.json({ message: `${usernameTrimmed} cadastrado com sucesso!` })
	} catch (error) {
		// return res.status(500).json({ message: `Erro: ${error}` })
		next(error)
	}
}

const signin = async (req, res, next) => {
	const { email, password } = req.body
	// const emailTrimmed = email ? email.trim() : email
	// const passwordTrimmed = password ? password.trim() : password
	if (!email || !password || email === '' || password === '') {
		next(errorHandler(400, 'Todos os campos devem ser preenchidos'))
	}
	try {
		const validUser = await User.findOne({ email })
		if (!validUser) {
			return next(errorHandler(404, 'Email ou Senha incorretos'))
		}
		const validPassword = bcryptjs.compareSync(password, validUser.password)
		if (!validPassword) {
			return next(errorHandler(404, 'Email ou Senha incorretos'))
		}

		const token = jwt.sign(
			{
				id: validUser._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		)
		const { password: psw, ...rest } = validUser._doc
		res
			.status(200)
			.cookie('acress_token', token, { httpOnly: true })
			.json(rest)
	} catch (error) {
		next(error)
	}
}

export { signup, signin }
