import { Routes, Route, Navigate } from 'react-router-dom';

import { ForgotPassword, Home, Login, ResetPassword, UpdateProposals } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/reset' element={<ResetPassword />}></Route>
			<Route path='/forgot' element={<ForgotPassword />}></Route>
			<Route path='/updateProposals' element={<UpdateProposals />}></Route>
			<Route path='*' element={<Navigate replace to='/' />}></Route>
		</Routes>
	);
}
