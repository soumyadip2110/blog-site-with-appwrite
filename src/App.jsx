import { useEffect, useState } from 'react'
import './App.css'
import { Footer, Header } from './components'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

function App() {
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		authService.getCurrentUser()
		.then((userData) => {
			if (userData){
				dispatch(login({userData}))
			} else {
				dispatch(logout())
			}
		})
		.catch((error) => {
			console.log('Error while loading: ', error);
		})
		.finally(() => {
			setLoading(false)
		})
	}, [])
	
	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
			<div className='w-full block'>
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : <div className='text-3xl'>Loading</div>
}

export default App
