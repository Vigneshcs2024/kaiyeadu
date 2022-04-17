import { Navigate, Outlet } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';

export function ProtectedRoute() {
	const { auth } = useAuthApi();

	return auth ? <Outlet /> : <Navigate to={`login`} />;
}
