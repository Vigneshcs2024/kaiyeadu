import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';

export default function Router() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}></Route>
			<Route path='*' element={<Navigate replace to='/login' />}></Route>
		</Routes>
	);
}
