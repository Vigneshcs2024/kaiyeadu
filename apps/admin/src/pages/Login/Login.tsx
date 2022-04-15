import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { useRequest, useAuthApi, UserNameContext } from '@kaiyeadu/hooks';
import { BackgroundContainer, Button, TextField, Loader } from '@kaiyeadu/ui/components';
import { login } from './login.service';
import { LoginValidation } from './validationSchema';
import { theme } from '@kaiyeadu/ui/base';
import { AdminAuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';

import { useState } from 'react';

export default function Login() {
	const { request } = useRequest();
	const { session } = useAuthApi();
	const [userName, setUserName] = useState('admin');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values: AdminAuthCredentialsDto) => {
		setIsLoading(true);
		try {
			const token = await login(request, values);
			session.setSession(token);
			setUserName(session.getDisplayName());

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const initialValues: AdminAuthCredentialsDto = {
		email: '',
		password: ''
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: LoginValidation
	});

	return (
		<UserNameContext.Provider value={userName}>
			{isLoading ? <Loader /> : ''}
			<BackgroundContainer
				style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				isLogin={true}>
				<InnerContainer>
					<h1>LOGIN</h1>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							label='Email'
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
							label='Password'
							name='password'
							type='password'
							value={formik.values.password}
							onChange={formik.handleChange}
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
							<Link to='/'>Forgot Password</Link>
						</BottomContainer>
					</form>
				</InnerContainer>
			</BackgroundContainer>
		</UserNameContext.Provider>
	);
}

const InnerContainer = styled.div`
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
