import styled from 'styled-components';

import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';

export default function Login() {
	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<InnerContainer>
				<h1>LOGIN</h1>
				<TextField label='ID' />
				<TextField label='Password' />
				<Button title='login' onClick={() => null} />
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
