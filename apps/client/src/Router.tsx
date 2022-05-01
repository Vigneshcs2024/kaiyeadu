import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, CriminalProfile } from './pages';
import { ProtectedRoute, AuthRoute } from '@kaiyeadu/ui/routes';

export default function Router() {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<CriminalProfile />} />
				<Route path='*' element={<Navigate replace to='/' />} />
			</Route>

			<Route element={<AuthRoute redirect='/' />}>
				<Route path='/login' element={<Login />} />
			</Route>
		</Routes>
	);
}
