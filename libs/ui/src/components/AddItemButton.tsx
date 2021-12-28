import { Icon } from '@iconify/react';
import styled from 'styled-components';

export function AddItemButton({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<ButtonContainer type='button' {...rest}>
			<Icon icon='carbon:add' color='#fff' width='50' />
		</ButtonContainer>
	);
}

const ButtonContainer = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto 1rem;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background-color: ${p => p.theme.secondary};
	border: none;
	outline: none;
	cursor: pointer;
`;
