import { AxiosInstance, AxiosError } from 'axios';
import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';

export async function login(axiosInstance: AxiosInstance, credentials: AuthCredentialsDto) {
	try {
		await axiosInstance.post('/auth/login', credentials);
	} catch (error) {
		console.error((error as AxiosError).response?.data.message);
	}
}
