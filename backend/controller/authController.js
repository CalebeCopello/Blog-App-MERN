import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

const signup = async (req, res) => {
	const { username, email, password } = req.body
	const usernameTrimmed = username.trim()
	const emailTrimmed = email.trim()
	const passwordTrimmed = password.trim()
	if (
		!username ||
		!email ||
		!password ||
		usernameTrimmed === '' ||
		emailTrimmed === '' ||
		passwordTrimmed === ''
	) {
		return res
			.status(400)
			.json({ message: 'Todos os campos devem ser preenchidos' })
	}
    const hashedPassword = await bcryptjs.hashSync(password, 10)
	const newUser = new User({
		username: usernameTrimmed,
		email: emailTrimmed.toLowerCase(),
		password: hashedPassword
	})
	try {
		await newUser.save()
		res.json({ message: `${usernameTrimmed} cadastrado com sucesso!` })
	} catch (error) {
		return res.status(500).json({ message: `Erro: ${error}` })
	}
}

export default signup
