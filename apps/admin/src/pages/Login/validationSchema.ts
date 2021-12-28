import * as Yup from 'yup';

export const LoginValidation = Yup.object({
	email: Yup.string().email('Invalid email format').required('Required'),
	password: Yup.string().required('Required')
});
