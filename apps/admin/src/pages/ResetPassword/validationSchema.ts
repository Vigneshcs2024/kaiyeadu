import * as Yup from 'yup';

export const ResetValidation = Yup.object({
	email: Yup.string().email('Invalid email format').required('Required')
});
