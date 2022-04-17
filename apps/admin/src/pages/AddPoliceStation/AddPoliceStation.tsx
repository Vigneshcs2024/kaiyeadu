import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { AddPSValidation } from './validationSchema';

import { theme } from '@kaiyeadu/ui/base';
import { BackgroundContainer, Button, Loader, TextField } from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

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
	const { request } = useRequest();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialPSValues,
		validationSchema: AddPSValidation,
		onSubmit: async values => {
			setIsLoading(true);

			try {
				const res = await request.post(Requests.STATION_CREATE, values);
				setIsLoading(false);
				toast.success(res.data.message);
				setTimeout(() => {
					navigate('/police-stations');
				}, 2000);
			} catch (error) {
				const err = error as CustomAxiosError;
				err.handleGlobally && err.handleGlobally(err);
				setIsLoading(false);
			}
		}
	});

	return (
		<BackgroundContainer pageTitle='Add Police Station'>
			{isLoading ? <Loader /> : null}
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
	color: ${p => p.theme.white};

	h1 {
		font-size: 4.5rem;
		margin: 1em;
	}
`;
