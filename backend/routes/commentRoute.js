import express from 'express'
import { createComment, getPostComments } from '../controller/commentController.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getpostcomments/:postId', getPostComments)


export default router