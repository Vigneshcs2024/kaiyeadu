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
	const [authenticated, setAuthData] = useState(session.isAuthenticated());

	useEffect(() => {
		setAuthData(session.isAuthenticated());
	}, [session]);

	const redirect = useLocation().pathname;
	return (
		<Route
			path={path}
			element={
				authenticated ? (
					<Component />
				) : (
					// not authenticated
					<Navigate to={`/auth/login?redirect=${redirect}`} />
				)
			}
			{...rest}
		/>
	);
}
