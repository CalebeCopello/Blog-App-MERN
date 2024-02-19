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
			default: 'https://pixabay.com/get/g05ef57b0874cf3f85f9ad8a62797599a69134374870e623780591ba80a95214501ddd80b92f6ba2a2f7e3381f1223bdf11caf2e360eef70cfa362f243be88a6fe4376a97ea17f6302152989815a7d71f_640.png'
		}
	},
	{ timestamps: true }
)

const User = mongoose.model('USer', userSchema)

export default User
