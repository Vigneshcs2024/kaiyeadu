import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, CriminalProfile } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/profile' element={<CriminalProfile />} />
			<Route path='*' element={<Navigate replace to='/' />}></Route>
		</Routes>
	);
}
