import Post from '../models/postModel.js'
import errorHandler from '../utils/errorHandler.js'

const create = async (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(errorHandler(403, 'Você não tem permissão para criar um post'))
	}
	if (!req.body.title || !req.body.content) {
		return next(errorHandler(400, 'O post deve ter um título e um corpo'))
	}
	const slug = req.body.title
		.split(' ')
		.join('-')
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, '')
	const newPost = new Post({
		...req.body,
		slug,
		userId: req.user.id,
	})
	try {
		const savedPost = await newPost.save()
		res.status(201).json(savedPost)
	} catch (error) {
		next(error)
	}
}

export { create }
