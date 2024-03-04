import express from 'express'
import {
	createComment,
	getPostComments,
	likeComment,
	editComment,
	deleteComment
} from '../controller/commentController.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getpostcomments/:postId', getPostComments)
router.put('/likecomment/:commentId', verifyToken, likeComment)
router.put('/editcomment/:commentId', verifyToken, editComment)
router.delete('/deletecomment/:commentId', verifyToken, deleteComment)

export default router
