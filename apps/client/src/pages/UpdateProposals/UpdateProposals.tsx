import styled from 'styled-components';
import { BackgroundContainer, Button, SectionWithNav, TextField } from '@kaiyeadu/ui/components';

export default function UpdateProposals() {
	return (
		<SectionWithNav>
			<BackgroundContainer
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '91.75vh'
				}}>
				<InnerContainer>
					<h1>Update Proposals</h1>
					<TextField label='Changes to be made' />
					<BottomContainer>
						<Button title='Submit' onClick={() => null} />
					</BottomContainer>
				</InnerContainer>
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
