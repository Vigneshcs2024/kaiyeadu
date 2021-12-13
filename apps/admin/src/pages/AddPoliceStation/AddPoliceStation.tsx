import { BackgroundContainer, Button, TextField } from '@kaiyeadu/ui/components';
import styled from 'styled-components';

export function AddStation() {
	return (
		<BackgroundContainer pageTitle='Add Police Station'>
			<Layout>
				<form>
					<TextField label='Name' />
					<TextField label='Area' />
					<TextField label='District' />
					<Button type='submit'>Add Station</Button>
				</form>
			</Layout>
		</BackgroundContainer>
	);
}

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: ${p => p.theme.white};

	h1 {
		font-size: 4.5rem;
		margin: 1em;
	}
`;
