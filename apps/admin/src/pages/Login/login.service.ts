import { AxiosInstance, AxiosError } from 'axios';
import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { LoginResponse, Token } from '@kaiyeadu/api-interfaces/responses';

export async function login(
	axiosInstance: AxiosInstance,
	credentials: AuthCredentialsDto
): Promise<Token> {
	try {
		const res = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
		console.log(res.data.message);
		return res.data.token;
	} catch (error) {
		console.error((error as AxiosError).response?.data.message);
		throw error;
	}
}
