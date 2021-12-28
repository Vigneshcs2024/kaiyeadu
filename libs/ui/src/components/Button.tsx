import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title?: string;
	isActive?: boolean;
}

export default function Button({
	onClick,
	title,
	isActive = true,
	children,
	...rest
}: IButtonProps) {
	return (
		<StyledButton isActive={isActive} onClick={isActive ? onClick : () => null} {...rest}>
			{title ?? children}
		</StyledButton>
	);
}

const StyledButton = styled.button<{ isActive: boolean | undefined }>`
	background-color: ${p => (p.isActive ? p.theme.primary : p.theme.lightGrey)};
	color: ${p => (p.isActive ? p.theme.white : p.theme.black)};
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
