import { AxiosError } from 'axios';

export interface CustomAxiosError extends AxiosError {
	handleAxiosError: () => void;
}

export interface CommonObject {
	[key: string]: unknown;
}
