import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, ResetPassword } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/reset' element={<ResetPassword />}></Route>
			<Route path='*' element={<Navigate replace to='/' />}></Route>
		</Routes>
	);
}
