import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from '../src/screens/About'
import Dashboard from '../src/screens/Dashboard'
import Home from '../src/screens/Home'
import Projects from '../src/screens/Projects'
import SignIn from '../src/screens/SignIn'
import SignUp from '../src/screens/SignUp'
import Header from './components/Header'

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
