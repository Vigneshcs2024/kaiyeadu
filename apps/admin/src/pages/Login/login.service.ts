import { AxiosInstance } from 'axios';

import { AdminAuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { LoginResponse, Token } from '@kaiyeadu/api-interfaces/responses';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export async function login(
	axiosInstance: AxiosInstance,
	credentials: AdminAuthCredentialsDto
): Promise<Token> {
	try {
		const res = await axiosInstance.post<LoginResponse>(Requests.ADMIN_LOGIN, credentials);
		console.log(res.data.message);
		return res.data.token;
	} catch (error) {
		const err = error as CustomAxiosError;
		err.handleGlobally && err.handleGlobally(err);
		throw error;
	}
}
