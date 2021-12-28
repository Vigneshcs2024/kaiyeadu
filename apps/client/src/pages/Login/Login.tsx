import styled from 'styled-components';
import { useFormik } from 'formik';

import { UserAuthCredentials } from '@kaiyeadu/api-interfaces/dtos';
import { useApi, useAuthApi } from '@kaiyeadu/hooks';
import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import { theme } from '@kaiyeadu/ui/base';
import { LoginValidation } from './validationSchema';
import { login } from './login.service';

export default function Login() {
	const { axiosInstance } = useApi();
	const { session } = useAuthApi();

	const handleSubmit = async (values: UserAuthCredentials) => {
		const token = await login(axiosInstance, values);
		session.setSession(token);
	};

	const formik = useFormik({
		initialValues: {
			gpf: '',
			password: ''
		},
		onSubmit: handleSubmit,
		validationSchema: LoginValidation
	});

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			isLogin={true}>
			<InnerContainer>
				<h1>LOGIN</h1>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						label='GPF ID'
						name='gpf'
						onChange={formik.handleChange}
						value={formik.values.gpf}
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
						name='password'
						label='Password'
						type='password'
						onChange={formik.handleChange}
						value={formik.values.password}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.password && formik.errors.password
								? {
										content: formik.errors.password,
										color: theme.palette.danger
								  }
								: ''
						}
					/>

					<BottomContainer>
						<Button title='login' type='submit' />
					</BottomContainer>
				</form>
			</InnerContainer>
		</BackgroundContainer>
	);
}

const InnerContainer = styled.div`
	width: 80%;
	max-width: 400px;

	h1 {
		color: ${p => p.theme.white};
		text-align: center;
		margin-bottom: 1.5em;
	}
`;
const BottomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	a {
		margin-top: 2em;
		color: ${p => p.theme.white};
	}
`;
