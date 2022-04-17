import { Navigate, Outlet } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';

export function AdminRoute() {
	const { session, auth } = useAuthApi();

	return auth && session.isAdmin() ? <Outlet /> : <Navigate to={`login`} />;
}
