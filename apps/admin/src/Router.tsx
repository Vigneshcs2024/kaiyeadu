import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminRoute, AuthRoute } from '@kaiyeadu/ui/routes';

import {
	AddStation,
	AddUser,
	AddCriminal,
	Home,
	Login,
	Requests,
	Logs,
	Users,
	PoliceStations,
	Criminals,
	CriminalProfile,
	ResetPassword
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
				<Route path='/logs' element={<Logs />} />
				<Route path='/users' element={<Users />} />
				<Route path='/police-stations' element={<PoliceStations />} />
			</Route>
			<Route element={<AuthRoute redirect='/' />}>
				<Route path='/login' element={<Login />} />
				<Route path='/reset-password' element={<ResetPassword />} />
			</Route>

			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
