import { Routes, Route, Navigate } from 'react-router-dom';

import { Login, Home } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
