import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from '../src/screens/About'
import Dashboard from '../src/screens/Dashboard'
import Home from '../src/screens/Home'
import Projects from '../src/screens/Projects'
import SignIn from '../src/screens/SignIn'
import SignUp from '../src/screens/SignUp'
import Header from './components/Header'
import FooterComponent from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './screens/CreatePost'
import UpdatePost from './screens/UpdatePost'
import PostPage from './screens/PostPage'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
					<Route
						path='/signin'
						element={<SignIn />}
					/>
					<Route
						path='/signup'
						element={<SignUp />}
					/>
					<Route element={<PrivateRoute />}>
						<Route
							path='/dashboard'
							element={<Dashboard />}
						/>
					</Route>
					<Route element={<OnlyAdminPrivateRoute />}>
						<Route
							path='/create-post'
							element={<CreatePost />}
						/>
						<Route
							path='/update-post/:postId'
							element={<UpdatePost />}
						/>
					</Route>
					<Route
						path='/projects'
						element={<Projects />}
					/>
					<Route
						path='/post/:postSlug'
						element={<PostPage />}
					/>
				</Routes>
				<FooterComponent />
			</BrowserRouter>
		</>
	)
}
export default App
