import axios from 'axios';
import { useMemo } from 'react';
import { useAuthApi } from './AuthEngine';

export function useApi() {
	const { session } = useAuthApi();

	const instance = useMemo(() => {
		const instance = axios.create({
			baseURL:
				process.env.NODE_ENV === 'development'
					? 'http://localhost:5000'
					: process.env.REACT_APP_API_URL
		});

		instance.defaults.headers.common.Authorization = session.isAuthenticated()
			? `Bearer ${session.getAuthToken()}`
			: null;

		return instance;
	}, [session]);

	return { api: instance };
}
