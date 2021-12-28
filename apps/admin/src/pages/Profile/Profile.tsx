import styled from 'styled-components';

import { BackgroundContainer } from '@kaiyeadu/ui/components';

export default function Profile() {
	return (
		<BackgroundContainer pageTitle='Profile'>
			<Layout>
				<h1>Profile page need to be implemented</h1>
			</Layout>
		</BackgroundContainer>
	);
}

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	text-align: center;

	h1 {
		font-size: 4rem;
		margin: 1em;
		color: ${p => p.theme.white};
	}
`;
