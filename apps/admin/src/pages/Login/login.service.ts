import { AxiosInstance } from 'axios';
import { FormikValues } from 'formik';

import { LoginResponse, Token } from '@kaiyeadu/api-interfaces/responses';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export async function getLoginPassword(axiosInstance: AxiosInstance, value: { gpf: string }) {
	try {
		const res = await axiosInstance.put<LoginResponse>(Requests.USER_GET_PASSWORD, value);
		return res.data.message;
	} catch (error) {
		const err = error as CustomAxiosError;
		err.handleAxiosError?.();
		throw error;
	}
}

export async function login(
	axiosInstance: AxiosInstance,
	credentials: FormikValues
): Promise<Token> {
	try {
		const res = await axiosInstance.post<LoginResponse>(Requests.USER_LOGIN, credentials);
		return res.data.token;
	} catch (error) {
		const err = error as CustomAxiosError;
		err.handleAxiosError?.();
		throw error;
	}
}
