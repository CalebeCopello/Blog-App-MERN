import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
			unique: true,
			minLength: 3,
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
		profilePicture:{
			type: String,
			default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
	},
	{ timestamps: true }
)

const User = mongoose.model('USer', userSchema)

export default User
