import axios from 'axios';
import { useMemo } from 'react';

import { useAuthApi } from './AuthEngine';

import { errorComposer } from '@kaiyeadu/ui/functions';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export function useRequest() {
	const { auth, session, setAuthToken } = useAuthApi();

	const instance = useMemo(() => {
		const instance = axios.create({
			baseURL: 'http://localhost:5000'
		});

		if (auth)
			instance.defaults.headers.common.Authorization = `Bearer ${session.getAuthToken()}`;

		instance.interceptors.response.use(undefined, (error: CustomAxiosError) => {
			error.handleAxiosError = errorComposer(error, setAuthToken);
			return Promise.reject(error);
		});

		return instance;
	}, [auth, session, setAuthToken]);

	return { request: instance };
}
