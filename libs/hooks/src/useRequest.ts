import axios from 'axios';
import { useMemo } from 'react';

import { useAuthApi } from './AuthEngine';

import { errorComposer } from '@kaiyeadu/ui/functions';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export function useRequest() {
	const { session } = useAuthApi();

	const instance = useMemo(() => {
		const instance = axios.create({
			baseURL:
				process.env.NODE_ENV === 'development'
					? 'http://localhost:5000'
					: process.env.REACT_APP_API_URL
		});

		if (session.isAuthenticated())
			instance.defaults.headers.common.Authorization = `Bearer ${session.getAuthToken()}`;

		instance.interceptors.response.use(undefined, function (error: CustomAxiosError) {
			error.handleGlobally = errorComposer(error);
			return Promise.reject(error);
		});

		return instance;
	}, [session]);

	return { request: instance };
}
