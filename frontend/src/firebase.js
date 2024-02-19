// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'blog-a3607.firebaseapp.com',
	projectId: 'blog-a3607',
	storageBucket: 'blog-a3607.appspot.com',
	messagingSenderId: '385344877841',
	appId: '1:385344877841:web:ddbe64d96f7f42baab08b0',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)


