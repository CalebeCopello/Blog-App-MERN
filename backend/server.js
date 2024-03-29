import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './config/dbConn.js'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT

connectDB()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal server error'
	res.status(statusCode).json({
		success: false,
		statusCode,
		message
	})
})

app.listen(PORT, (req, res) => {
	console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
	mongoose.connection.once('open', () => {
		console.log('Connected to MongoDB')
	})
})
