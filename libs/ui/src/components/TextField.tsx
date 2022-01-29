import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	tip?: string | { content: string | string[]; color: string };
	width?: string;
}

const TextField: FC<InputProps> = ({ label, tip, width, ...rest }) => (
	<Container minWidth={width}>
		{label && <label htmlFor={rest.id ?? rest.name}>{label}</label>}
		<input id={rest.id ?? rest.name} {...rest} />

		<p style={typeof tip !== 'string' ? { color: tip?.color } : {}}>
			{typeof tip === 'string' ? tip : tip?.content} &nbsp;
		</p>
	</Container>
);

const Container = styled.div<{ minWidth: string | undefined }>`
	display: flex;
	min-width: ${props => (typeof props.minWidth === 'string' ? props.minWidth : '70%')};
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 0.4em;
	}

	@media only screen and (max-width: 600px) {
		min-width: 80%;
	}

	label {
		color: ${p => p.theme.white};
		margin-bottom: 0.2em;
		font-size: 2rem;
	}

	input {
		font: inherit;
		border-radius: 0.5rem;
		padding: 1.3rem;
		outline: none;
		border: none;

		&[type='password'] {
			font-weight: bold;
			letter-spacing: 0.4em;
		}
	}

	p {
		font-size: 0.8em;
		margin: 0.5rem;
		font-weight: 700;
	}
`;

export default TextField;
