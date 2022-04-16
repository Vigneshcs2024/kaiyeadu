import { Navigate, Outlet } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';

export default function AdminRoute() {
	const { session, auth } = useAuthApi();

	return auth && session.isAdmin() ? <Outlet /> : <Navigate to={`login`} />;
}
