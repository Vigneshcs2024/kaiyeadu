import { AxiosError } from 'axios';

export interface CustomAxiosError extends AxiosError {
	handleAxiosError: () => void;
}
