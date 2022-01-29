import styled from 'styled-components';

export const Chip = styled.p`
	padding: 0.5rem 2rem;
	font-size: 0.8em;
	text-transform: uppercase;
	background-color: ${props => props.theme.primary};
	color: ${props => props.theme.white};
	border-radius: 5rem;

	&:not(:last-child) {
		margin-right: 1rem;
	}
`;
