import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, UpdateProposals } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/updateProposals' element={<UpdateProposals />}></Route>
			<Route path='*' element={<Navigate replace to='/' />}></Route>
		</Routes>
	);
}
