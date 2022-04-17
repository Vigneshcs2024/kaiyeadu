import { Navigate, Outlet } from 'react-router-dom';

import { useAuthApi } from '@kaiyeadu/hooks';

export function AuthRoute({ redirect }: { redirect: string }) {
	const { auth } = useAuthApi();

	return !auth ? <Outlet /> : <Navigate to={redirect} />;
}
