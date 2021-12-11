import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';

export default function Login() {
	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			isLogin={true}>
			<InnerContainer>
				<h1>LOGIN</h1>
				<TextField label='Email ID' />
				<TextField label='Password' />
				<BottomContainer>
					<Button title='login' onClick={() => null} />
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
