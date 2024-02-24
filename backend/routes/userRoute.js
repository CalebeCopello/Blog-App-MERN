import express from 'express'
import { test, updateUser, deleteUser, signOutUser } from '../controller/userController.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOutUser)

export default router
