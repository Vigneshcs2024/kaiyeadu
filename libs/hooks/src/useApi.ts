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
		instance.defaults.headers.common.Authorization = `Bearer ${session.getAuthToken()}`;
		return instance;
	}, [session]);

	return { axiosInstance: instance };
}
