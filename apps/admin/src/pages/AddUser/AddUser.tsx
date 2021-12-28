import { BackgroundContainer, Button, DropDownList, TextField } from '@kaiyeadu/ui/components';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { AddUserValidation } from './validationSchema';
import { theme } from '@kaiyeadu/ui/base';

interface AddUserInt {
	name: string;
	gpf: string;
	email: string;
	phoneNumber: string;
	policeStation: string;
	designation: string;
	role: string;
}

const initialAddUserValues: AddUserInt = {
	name: '',
	gpf: '',
	email: '',
	phoneNumber: '',
	policeStation: '',
	designation: '',
	role: 'user'
};

export function AddUser() {
	const formik = useFormik({
		initialValues: initialAddUserValues,
		validationSchema: AddUserValidation,
		onSubmit: values => console.log(values)
	});

	return (
		<BackgroundContainer pageTitle='Add User'>
			<Layout>
				<Form onSubmit={formik.handleSubmit}>
					<TextField
						label='Name'
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.name && formik.errors.name
								? {
										content: formik.errors.name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='GPF Number'
						name='gpf'
						value={formik.values.gpf}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.gpf && formik.errors.gpf
								? {
										content: formik.errors.gpf,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Email'
						type='email'
						name='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.email && formik.errors.email
								? {
										content: formik.errors.email,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Phone'
						type='tel'
						name='phoneNumber'
						value={formik.values.phoneNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.phoneNumber && formik.errors.phoneNumber
								? {
										content: formik.errors.phoneNumber,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Police Station'
						name='policeStation'
						value={formik.values.policeStation}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.policeStation && formik.errors.policeStation
								? {
										content: formik.errors.policeStation,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Designation'
						name='designation'
						value={formik.values.designation}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.designation && formik.errors.designation
								? {
										content: formik.errors.designation,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Role'
						id='ddl'
						items={['user', 'admin', 'master']}
						name='role'
						value={formik.values.role}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.role && formik.errors.role
								? {
										content: formik.errors.role,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<Button type='submit'>Add User</Button>
				</Form>
			</Layout>
		</BackgroundContainer>
	);
}

const Form = styled.form`
	margin: 3rem auto;
`;

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: ${p => p.theme.white};

	h1 {
		font-size: 4.5rem;
		margin: 1em;
	}
`;
