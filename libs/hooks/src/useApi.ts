import axios from 'axios';
import config from 'config';
import { useMemo } from 'react';
import { useAuthApi } from './AuthEngine';

export function useApi() {
	const { session } = useAuthApi();

	const instance = useMemo(() => {
		const instance = axios.create({
			baseURL:
				config.util.getEnv('NODE_ENV') === 'development'
					? `${config.get('api.host')}:${config.get('api.port')}`
					: config.get('apps.api-url')
		});
		instance.defaults.headers.common.Authorization = `Bearer ${session.getAuthToken()}`;
		return instance;
	}, [session]);

	return { axiosInstance: instance };
}
