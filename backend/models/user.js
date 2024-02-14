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
		password: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 30,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('USer', userSchema)

export default User