import { Navigate, Route, Routes } from 'react-router-dom';
import { AddStation, AddUser, Home, Login, Profile, Records } from './pages';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/users/add' element={<AddUser />} />
			<Route path='/police-stations/add' element={<AddStation />} />
			<Route path='/records' element={<Records />} />

			<Route path='*' element={<Navigate replace to='/' />} />
		</Routes>
	);
}
