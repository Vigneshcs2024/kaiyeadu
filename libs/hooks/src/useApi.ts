import { AdminAuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { GeneralApiResponse, LoginResponse } from '@kaiyeadu/api-interfaces/responses';
import { AxiosError } from 'axios';
import { useReducer } from 'react';
import { useRequest } from './useRequest';

export enum ApiActionType {
	LOGIN = 'login'
}

export type ApiAction = {
	type: ApiActionType;
	payload: Record<string, unknown> | AdminAuthCredentialsDto;
};

export function useApi() {
	const { request } = useRequest();
	const initialState: ApiResponse = { loading: true };

	const apiReducer = (givenState: ApiResponse, action: ApiAction) => {
		const apiResponse = { ...givenState };

		switch (action.type) {
			case ApiActionType.LOGIN: {
				try {
					const res = request.post('/auth/admin/login', action.payload).then(r => r.data);
					apiResponse.data = res;
				} catch (error) {
					apiResponse.error = error as AxiosError<{ message: string }>;
				}
			}
		}

		apiResponse.loading = false;

		return apiResponse;
	};

	const [response, dispatch] = useReducer(apiReducer, initialState);

	return [response, dispatch];
}

export type ApiResponse = {
	data?: Promise<GeneralApiResponse> | Promise<LoginResponse>;
	loading: boolean;
	error?: AxiosError<{ message: string }>;
};
