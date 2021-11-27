import { useAuthApi, useQueryParams } from '@kaiyeadu/hooks';
import { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthRoute({ element: Component, path, ...rest }: { element: any; path: string }) {
	const { session } = useAuthApi();
	const query = useQueryParams();
	const [authenticated, setAuthenticated] = useState(session.isAuthenticated());

	useEffect(() => {
		setAuthenticated(session.isAuthenticated());
	}, [session]);

	return (
		<Route
			path={path}
			element={
				!authenticated ? <Component /> : <Navigate to={query.get('redirect') ?? '/home'} />
			}
			{...rest}
		/>
	);
}
