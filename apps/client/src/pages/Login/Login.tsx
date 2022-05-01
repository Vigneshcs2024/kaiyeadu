import { useState } from 'react';
import styled from 'styled-components';

import { useAuthApi, useRequest } from '@kaiyeadu/hooks';
import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import { getLoginPassword, login } from './login.service';
import toast from 'react-hot-toast';

export default function Login() {
	const { request } = useRequest();
	const { setAuthToken } = useAuthApi();

	const [credentials, setCredentials] = useState({
		gpf: '',
		password: ''
	});
	const [isUser, setIsUser] = useState(false);

	const handleLogin = async (credentials: { gpf: string; password: string }) => {
		try {
			const token = await login(request, credentials);
			setAuthToken(token);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetPassword = async (value: { gpf: string }) => {
		try {
			const message = await getLoginPassword(request, value);
			toast.success(message);
			setIsUser(true);
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials(old => ({
			...old,
			[e.target.name]: e.target.value
		}));
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			isLogin={true}>
			<InnerContainer>
				<h1>LOGIN</h1>

				<TextField
					label='GPF ID'
					name='gpf'
					value={credentials.gpf}
					onChange={handleChange}
				/>
				{isUser && (
					<TextField
						name='password'
						label='Password'
						type='password'
						value={credentials.password}
						onChange={handleChange}
					/>
				)}

				<BottomContainer>
					<Button
						title={isUser ? 'Login' : 'Get Password'}
						type='submit'
						onClick={
							isUser
								? () => handleLogin(credentials)
								: () => handleGetPassword({ gpf: credentials.gpf })
						}
					/>
				</BottomContainer>
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
