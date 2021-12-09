import { ReactChild } from 'react';
import styled from 'styled-components';

import { Sidebar } from '.';

interface Props {
	children: ReactChild;
}

export default function SectionWithNav({ children }: Props) {
	return (
		<Section>
			<Sidebar
				content={[
					{ title: 'Home', path: '/' },
					{ title: 'Update Proposals', path: '/' },
					{ title: 'Reset Password', path: '/reset' },
					{ title: 'Logout' }
				]}>
				{children}
			</Sidebar>
		</Section>
	);
}

const Section = styled.section`
	margin: 6rem auto;
`;
