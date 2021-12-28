import * as Yup from 'yup';

export const AddUserValidation = Yup.object({
	name: Yup.string().required('Required'),
	gpf: Yup.string().min(10).max(10).required('Required'),
	email: Yup.string().email('Invalid Email').required('Required'),
	phoneNumber: Yup.string()
		.matches(/[1-9]{1}[0-9]{9}/, 'Invalid Number')
		.min(10, 'Phone Number must have 10 digits')
		.max(10, 'Phone Number must have 10 digits')
		.required('Required'),
	policeStation: Yup.string().required('Required'),
	designation: Yup.string().required('Required'),
	role: Yup.string().required('Required')
});
