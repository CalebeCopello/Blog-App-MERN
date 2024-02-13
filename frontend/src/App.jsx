import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from '../src/screens/About'
import Dashboard from '../src/screens/Dashboard'
import Home from '../src/screens/Home'
import Projects from '../src/screens/Projects'
import SignIn from '../src/screens/SignIn'
import SignUp from '../src/screens/SignUp'

const App = () => {
	return (
		<>
			<BrowserRouter>
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
						path='/sign-in'
						element={<SignIn />}
					/>
					<Route
						path='/sign-up'
						element={<SignUp />}
					/>
					<Route
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						path='/projects'
						element={<Projects />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}
export default App
