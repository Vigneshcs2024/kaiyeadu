import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';
import { AuthRoute, ProtectedRoute } from '@kaiyeadu/ui/routes';

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
	CriminalProfile
} from './pages';

export default function Router() {
	const { session } = useAuthApi();
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				{session.getUserRole() === 'admin' && (
					<>
						<Route path='/' element={<Home />} />
						<Route path='/profile' element={<CriminalProfile />} />
						<Route path='/users/add' element={<AddUser />} />
						<Route path='/criminals/add' element={<AddCriminal />} />
						<Route path='/police-stations/add' element={<AddStation />} />
						<Route path='/criminals' element={<Criminals />} />
						<Route path='/comments' element={<Requests />} />
						<Route path='/logs' element={<Logs />} />
						<Route path='/users' element={<Users />} />
						<Route path='/police-stations' element={<PoliceStations />} />
					</>
				)}
				{session.getUserRole() === 'master' && (
					<>
						<Route path='/' element={<Home />} />
						<Route path='/profile' element={<CriminalProfile />} />
						<Route path='/criminals/add' element={<AddCriminal />} />
						<Route path='/criminals' element={<Criminals />} />
						<Route path='/users' element={<Users />} />
						<Route path='/police-stations' element={<PoliceStations />} />
					</>
				)}
				{session.getUserRole() === 'user' && (
					<>
						<Route path='/' element={<Criminals />} />
						<Route path='/profile' element={<CriminalProfile />} />
						<Route path='*' element={<Navigate replace to='/' />} />
					</>
				)}
				<Route path='/' element={<Outlet />} />
			</Route>

			<Route element={<AuthRoute redirect='/' />}>
				<Route path='/login' element={<Login />} />
			</Route>

			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
