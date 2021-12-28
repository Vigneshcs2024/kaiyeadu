import { Icon } from '@iconify/react';
import styled from 'styled-components';

interface RemoveGroupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon_width?: string;
}

export function RemoveGroupButton({ icon_width, ...rest }: RemoveGroupButtonProps) {
	return (
		<ButtonContainer type='button' {...rest}>
			<Icon icon='clarity:window-close-line' width={icon_width ? icon_width : '35'} />
		</ButtonContainer>
	);
}

const ButtonContainer = styled.button`
	position: absolute;
	top: -2rem;
	right: -2rem;
	margin: auto 1rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background-color: ${p => p.theme.white};
	border: none;
	outline: none;
	cursor: pointer;
`;
