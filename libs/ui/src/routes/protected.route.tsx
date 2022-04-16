import { Navigate, Outlet } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';

export default function AdminRoute() {
	const { auth } = useAuthApi();

	return auth ? <Outlet /> : <Navigate to={`login`} />;
}
