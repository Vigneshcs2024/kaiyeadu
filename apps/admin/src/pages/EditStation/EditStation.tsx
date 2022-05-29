import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { theme } from '@kaiyeadu/ui/base';
import { BackgroundContainer, Button, Loader, TextField } from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useRequest } from '@kaiyeadu/hooks';
import { CommonObject, CustomAxiosError } from '@kaiyeadu/ui/interface';
import { AddPSValidation } from '../AddPoliceStation/validationSchema';

export function EditStation() {
	const [isLoading, setIsLoading] = useState(false);
	const [initialValues, setInitialValues] = useState({
		name: '',
		area: '',
		district: ''
	});
	const navigate = useNavigate();
	const { request } = useRequest();
	const { state } = useLocation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema: AddPSValidation,
		onSubmit: async values => {
			setIsLoading(true);
			try {
				const res = await request.patch(Requests.STATION_UPDATE + state.id, values);
				setIsLoading(false);
				toast.success(res.data.message, { duration: 500 });
				setTimeout(() => {
					navigate('/police-stations');
				}, 500);
			} catch (error) {
				const err = error as CustomAxiosError;
				err.handleAxiosError?.();
				setIsLoading(false);
			}
		}
	});

	useEffect(() => {
		const temp = state as CommonObject;

		setInitialValues({
			name: temp.name as string,
			area: temp.area as string,
			district: temp.district as string
		});
	}, [state]);

	return (
		<BackgroundContainer pageTitle='Edit User'>
			<Layout>
				{isLoading && <Loader withOverlay={true} />}
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
					<Button type='submit'>Save</Button>
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
