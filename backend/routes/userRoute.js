import express from 'express'
import {
	test,
	updateUser,
	deleteUser,
	signOutUser,
	getUsers,
    deleteUserAdmin,
} from '../controller/userController.js'
import verifyToken from '../utils/verifyToken.js'

const router = express.Router()

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOutUser)
router.get('/getusers', verifyToken, getUsers)
router.delete('/deleteuser/:userId', verifyToken, deleteUserAdmin)

export default router
