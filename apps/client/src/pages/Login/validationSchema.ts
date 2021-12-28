import * as Yup from 'yup';

export const LoginValidation = Yup.object({
	gpf: Yup.string().min(10).max(10).required('Required'),
	password: Yup.string().required('Required')
});
