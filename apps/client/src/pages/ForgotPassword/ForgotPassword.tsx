import styled from 'styled-components';
import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
	return (
		<BackgroundContainer
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<InnerContainer>
				<h1>Forgot Password</h1>
				<TextField label='Email ID' />
				<BottomContainer>
					<Link to='/'>
						<Button title='Submit' onClick={() => null} />
					</Link>
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
