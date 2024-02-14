import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import connectDB from './config/dbConn.js'

const app = express()
const PORT = process.env.PORT

connectDB()
app.listen(PORT, (req, res) => {
	console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
	mongoose.connection.once('open', () => {
		console.log('Connected to MongoDB')
	})
})
