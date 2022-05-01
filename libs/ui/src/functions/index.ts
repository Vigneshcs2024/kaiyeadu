import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const errorComposer = (error: AxiosError, setAuthToken: (token: string) => void) => {
	return () => {
		const statusCode = error.response ? error.response.status : null;

		if (statusCode === 401) {
			toast.error('Please login to access this resource');
			setTimeout(() => {
				setAuthToken('');
			}, 1000);
		} else {
			toast.error(
				error.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
			);
		}
	};
};
