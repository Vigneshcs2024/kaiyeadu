import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
}

export default function SectionWithNav({ children }: Props) {
	return <Section>{children}</Section>;
}

const Section = styled.section`
	margin: 6rem auto;
`;
