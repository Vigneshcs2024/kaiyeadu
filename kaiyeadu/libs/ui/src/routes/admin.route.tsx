import { useEffect, useState } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuthApi } from '@kaiyeadu/hooks';

export function ProtectedRoute({
	path,
	element: Component,
	...rest
}: {
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	element: any;
}) {
	const { session } = useAuthApi();
	const [{ authenticated, is_admin }, setAuthData] = useState({
		authenticated: session.isAuthenticated(),
		is_admin: session.isAdmin()
	});

	useEffect(() => {
		setAuthData({
			authenticated: session.isAuthenticated(),
			is_admin: session.isAdmin()
		});
	}, [session]);

	const redirect = useLocation().pathname;
	return (
		<Route
			path={path}
			element={
				authenticated ? (
					is_admin ? (
						// authenticated & admin
						<Component />
					) : (
						// authenticated but not admin
						<Navigate to={`/auth/verify?redirect=${redirect}`} />
					)
				) : (
					// not authenticated
					<Navigate to={`/auth/login?redirect=${redirect}`} />
				)
			}
			{...rest}
		/>
	);
}
