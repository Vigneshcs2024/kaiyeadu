import { ChangeEvent, FormEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useApi, useAuthApi } from '@kaiyeadu/hooks';
import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import { login } from './login.service';

export default function Login() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const { axiosInstance } = useApi();
	const { session } = useAuthApi();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		const token = await login(axiosInstance, formData);
		session.setSession(token);
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			isLogin={true}>
			<InnerContainer>
				<h1>LOGIN</h1>
				<form onSubmit={handleSubmit}>
					<TextField
						label='Email'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<TextField
						label='Password'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
					<BottomContainer>
						<Button title='login' type='submit' />
						<Link to='/'>Forgot Password</Link>
					</BottomContainer>
				</form>
			</InnerContainer>
		</BackgroundContainer>
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
