import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	tip?: string | { content: string; color: string };
}

const TextField: FC<InputProps> = ({ name, label, tip, ...rest }) => (
	<Container>
		{label && <label htmlFor={name}>{label}</label>}
		<input id={name} {...rest} />
		<p style={typeof tip !== 'string' ? { color: tip?.color } : {}}>
			{typeof tip === 'string' ? tip : tip?.content} &nbsp;
		</p>
	</Container>
);

const Container = styled.div`
	display: flex;
	min-width: 45rem;
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
	}

	p {
		font-size: 0.8em;
		margin: 0.5rem;
	}
`;

export default TextField;
