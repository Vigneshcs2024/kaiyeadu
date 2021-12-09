import styled from 'styled-components';
import { useState } from 'react';

import { BackgroundContainer, Button, SectionWithNav, TextField } from '@kaiyeadu/ui/components';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
	const [step, setStep] = useState(1);

	return (
		<SectionWithNav>
			<BackgroundContainer
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '91.75vh'
				}}>
				{step === 1 ? (
					<InnerContainer>
						<h1>RESET PASSWORD</h1>
						<TextField label='Email id' type='email' />
						<BottomContainer>
							<Button title='Get OTP' onClick={() => setStep(2)} />
						</BottomContainer>
					</InnerContainer>
				) : step === 2 ? (
					<InnerContainer>
						<h1>RESET PASSWORD</h1>
						<TextField label='Enter OTP' type='number' />
						<BottomContainer>
							<Button title='Submit' onClick={() => setStep(3)} />
						</BottomContainer>
					</InnerContainer>
				) : (
					<InnerContainer>
						<h1>RESET PASSWORD</h1>
						<TextField label='New Password' type='password' />
						<TextField label='Re-enter Password' type='password' />
						<BottomContainer>
							<Link to='/'>
								<Button title='Submit' onClick={() => setStep(1)} />
							</Link>
						</BottomContainer>
					</InnerContainer>
				)}
			</BackgroundContainer>
		</SectionWithNav>
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
