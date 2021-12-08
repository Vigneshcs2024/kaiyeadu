import styled from 'styled-components';

interface props {
	onClick: () => void;
	title: string;
}

export default function Button({ onClick, title }: props) {
	return <StyledButton onClick={onClick}>{title}</StyledButton>;
}

const StyledButton = styled.button`
	background-color: ${p => p.theme.primary};
	color: ${p => p.theme.white};
	font: inherit;
	letter-spacing: 0.3ex;
	border-radius: 2em;
	padding: 0.8em 2em;
	outline: none;
	border: none;
	text-transform: uppercase;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		transform: translateY(-3px);
	}
`;
