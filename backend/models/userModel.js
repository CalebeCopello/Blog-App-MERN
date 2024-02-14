import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			minLength: 3,
			maxLength: 15,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			minLength: 5,
			maxLength: 70,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('USer', userSchema)

export default User
