import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const TextField: FC<InputProps> = ({ name, label, ...rest }) => {
	return (
		<Container>
			{label && <label htmlFor={name}>{label}</label>}
			<input id={name} {...rest} />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1em 0;

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
`;

export default TextField;
