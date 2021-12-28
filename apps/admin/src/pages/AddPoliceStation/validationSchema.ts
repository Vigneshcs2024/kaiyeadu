import * as Yup from 'yup';

export const AddPSValidation = Yup.object({
	name: Yup.string().required('Required'),
	area: Yup.string().required('Required'),
	district: Yup.string().required('Required')
});
