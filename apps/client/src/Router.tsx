import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';

export default function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='*' element={<Navigate replace to='/' />}></Route>
		</Routes>
	);
}
