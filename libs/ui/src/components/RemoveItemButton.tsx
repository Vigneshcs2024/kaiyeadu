import { Icon } from '@iconify/react';
import styled from 'styled-components';

export function RemoveItemButton({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<ButtonContainer type='button' {...rest}>
			<Icon icon='akar-icons:minus' color='#C4171C' width='30' />
		</ButtonContainer>
	);
}

const ButtonContainer = styled.button`
	margin: auto 1rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background-color: ${p => p.theme.white};
	border: none;
	outline: none;
	cursor: pointer;
`;
