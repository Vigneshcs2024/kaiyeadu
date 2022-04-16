import { AxiosError } from 'axios';

export interface CustomAxiosError extends AxiosError {
	handleGlobally: (err: AxiosError) => void;
}
