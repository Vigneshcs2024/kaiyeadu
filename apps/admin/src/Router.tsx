import { Navigate, Route, Routes } from 'react-router-dom';
import {
	AddStation,
	AddUser,
	AddCriminal,
	Home,
	Login,
	Profile,
	Requests,
	Admins,
	Users,
	PoliceStations,
	Criminals
} from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/users/add' element={<AddUser />} />
			<Route path='/criminals/add' element={<AddCriminal />} />
			<Route path='/police-stations/add' element={<AddStation />} />
			<Route path='/criminals' element={<Criminals />} />
			<Route path='/requests' element={<Requests />} />
			<Route path='/admins' element={<Admins />} />
			<Route path='/users' element={<Users />} />
			<Route path='/police-stations' element={<PoliceStations />} />

			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
