import { Routes, Route, Navigate } from 'react-router-dom';

import { Login, Home, Profile } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
