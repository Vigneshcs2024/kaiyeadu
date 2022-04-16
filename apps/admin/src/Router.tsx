import { Navigate, Route, Routes } from 'react-router-dom';

import AdminRoute from '@kaiyeadu/ui/routes/admin.route';
import AuthRoute from '@kaiyeadu/ui/routes/auth.route';

import {
	AddStation,
	AddUser,
	AddCriminal,
	Home,
	Login,
	Requests,
	Admins,
	Users,
	PoliceStations,
	Criminals,
	CriminalProfile
} from './pages';

export default function Router() {
	return (
		<Routes>
			<Route element={<AdminRoute />}>
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<CriminalProfile />} />
				<Route path='/users/add' element={<AddUser />} />
				<Route path='/criminals/add' element={<AddCriminal />} />
				<Route path='/police-stations/add' element={<AddStation />} />
				<Route path='/criminals' element={<Criminals />} />
				<Route path='/requests' element={<Requests />} />
				<Route path='/admins' element={<Admins />} />
				<Route path='/users' element={<Users />} />
				<Route path='/police-stations' element={<PoliceStations />} />
			</Route>
			<Route element={<AuthRoute redirect='/' />}>
				<Route path='/login' element={<Login />} />
			</Route>

			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
