import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	path?: string;
	icon: string;
	width?: string;
}

export function ModifyButton({ path, icon, width, ...rest }: ButtonProps) {
	return (
		<ButtonContainer {...rest}>
			{path ? (
				<Link to={path}>
					<Icon icon={icon} color='#fff' width={width ? width : '50'} />
				</Link>
			) : (
				<Icon icon={icon} color='#fff' width={width ? width : '50'} />
			)}
		</ButtonContainer>
	);
}

const ButtonContainer = styled.button`
	position: fixed;
	bottom: 3rem;
	right: 5rem;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 6.5rem;
	height: 6.5rem;
	border-radius: 50%;
	background-color: ${p => p.theme.primary};
	cursor: pointer;
	transition: 0.2s all;
	border: none;
	outline: none;

	&:hover {
		box-shadow: ${p => `1px 1px 10px ${p.theme.grey}`};
	}
`;
