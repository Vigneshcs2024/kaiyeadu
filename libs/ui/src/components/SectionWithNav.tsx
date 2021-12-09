import { ReactChild } from 'react';
import styled from 'styled-components';

import { Sidebar } from '.';

interface Props {
	children: ReactChild;
	content: { title: string; path?: string; fun?: () => void }[];
}

export default function SectionWithNav({ children, content }: Props) {
	return (
		<Section>
			<Sidebar content={content}>{children}</Sidebar>
		</Section>
	);
}

const Section = styled.section`
	margin: 6rem auto;
`;
