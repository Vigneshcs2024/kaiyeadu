import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const errorComposer = (error: AxiosError) => {
	return () => {
		const statusCode = error.response ? error.response.status : null;

		if (statusCode === 400 || statusCode === 404) {
			toast.error(
				error.response?.data?.message ?? 'Something went wrong ! Please try again later 😪'
			);
		} else if (statusCode === 401) {
			toast.error('Please login to access this resource');
		} else {
			toast.error('Something went wrong ! Please try again later');
		}
	};
};
