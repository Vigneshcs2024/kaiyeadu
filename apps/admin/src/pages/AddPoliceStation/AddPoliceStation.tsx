import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { AddPSValidation } from './validationSchema';
import { theme } from '@kaiyeadu/ui/base';

interface AddPSInt {
	name: string;
	area: string;
	district: string;
}

const initialPSValues: AddPSInt = {
	name: '',
	area: '',
	district: ''
};

export function AddStation() {
	const formik = useFormik({
		initialValues: initialPSValues,
		validationSchema: AddPSValidation,
		onSubmit: values => console.log(values)
	});

	return (
		<BackgroundContainer pageTitle='Add Police Station'>
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
						label='Area'
						name='area'
						value={formik.values.area}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.area && formik.errors.area
								? {
										content: formik.errors.area,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='District'
						name='district'
						value={formik.values.district}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.district && formik.errors.district
								? {
										content: formik.errors.district,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<Button type='submit'>Add Station</Button>
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
