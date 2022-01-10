import { AxiosInstance, AxiosError } from 'axios';
import { AdminAuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { LoginResponse, Token } from '@kaiyeadu/api-interfaces/responses';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';

export async function login(
	axiosInstance: AxiosInstance,
	credentials: AdminAuthCredentialsDto
): Promise<Token> {
	try {
		const res = await axiosInstance.post<LoginResponse>(Requests.ADMIN_LOGIN, credentials);
		console.log(res.data.message);
		return res.data.token;
	} catch (error) {
		console.error((error as AxiosError).response?.data.message);
		throw error;
	}
}
