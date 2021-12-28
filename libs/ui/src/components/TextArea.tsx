import { FC, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	tip?: string | { content: string; color: string };
}

const TextArea: FC<InputProps> = ({ label, tip, ...rest }) => (
	<Container>
		{label && <label htmlFor={rest.id ?? rest.name}>{label}</label>}
		<textarea id={rest.id ?? rest.name} {...rest} />
		<p style={typeof tip !== 'string' ? { color: tip?.color } : {}}>
			{typeof tip === 'string' ? tip : tip?.content} &nbsp;
		</p>
	</Container>
);

const Container = styled.div`
	display: flex;
	min-width: 50rem;
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 0.4em;
	}

	@media only screen and (max-width: 750px) {
		min-width: 80%;
	}

	label {
		color: ${p => p.theme.white};
		margin-bottom: 0.5em;
		font-size: 2rem;
		font-weight: 600;
	}

	textarea {
		font: inherit;
		border-radius: 0.5rem;
		padding: 1.3rem;
		outline: none;
		border: none;
		resize: none;
		height: 20rem;
		width: 100%;
	}

	p {
		font-size: 0.8em;
		margin: 0.5rem;
	}
`;

export default TextArea;
