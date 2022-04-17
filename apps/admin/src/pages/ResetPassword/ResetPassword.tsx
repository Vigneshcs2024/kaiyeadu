import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { ResetValidation } from './validationSchema';

import { BackgroundContainer, Button, TextField, Loader } from '@kaiyeadu/ui/components';
import { theme } from '@kaiyeadu/ui/base';
import { ResetPasswordDto } from '@kaiyeadu/api-interfaces/dtos';
import { useRequest } from '@kaiyeadu/hooks';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export default function ResetPassword() {
	const { request } = useRequest();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (values: ResetPasswordDto) => {
		setIsLoading(true);

		try {
			const res = await request.patch(Requests.ADMIN_RESET_PASSWORD, values);
			setIsLoading(false);
			toast.success(res.data.message);
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (error) {
			const err = error as CustomAxiosError;
			err.handleGlobally && err.handleGlobally(err);
			setIsLoading(false);
		}
	};

	const initialValues: ResetPasswordDto = {
		email: ''
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema: ResetValidation
	});

	return (
		<>
			{isLoading ? <Loader /> : ''}
			<BackgroundContainer
				style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				isLogin={true}>
				<InnerContainer>
					<h1>Reset Password</h1>
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
						<BottomContainer>
							<Button title='Reset' type='submit' />
							<Link to='/login'>Login</Link>
						</BottomContainer>
					</form>
				</InnerContainer>
			</BackgroundContainer>
		</>
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
