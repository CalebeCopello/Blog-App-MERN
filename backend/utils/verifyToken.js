import jwt from 'jsonwebtoken'
import errorHandler from './errorHandler.js'

const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token
	if (!token) {
		return next(errorHandler(401, 'Acesso não autorizado'))
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return next(errorHandler(401, 'Acesso não autorizado'))
		}
        req.user = user
        next()
	})
}

export default verifyToken
