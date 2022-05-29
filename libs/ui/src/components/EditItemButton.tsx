import { Icon } from '@iconify/react';
import styled from 'styled-components';

export function EditItemButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<ButtonContainer type='button' {...props}>
			<Icon icon='clarity:edit-line' color='#fff' width='30' />
		</ButtonContainer>
	);
}

const ButtonContainer = styled.button`
	margin: auto 1rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background-color: ${p => p.theme.primary};
	border: none;
	outline: none;
	cursor: pointer;
`;
