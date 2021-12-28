import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function CheckBox({ label, ...rest }: CheckBoxProps) {
	return (
		<CheckboxContainer>
			<label htmlFor={rest.id ?? rest.name}>{label}</label>
			<Input
				id={rest.id ?? rest.name}
				{...rest}
				name={rest.id ?? rest.name}
				type='checkbox'
			/>
		</CheckboxContainer>
	);
}

const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem auto;
`;

const Input = styled.input`
	margin: 1rem;
	width: 2rem;
	height: 2rem;
	border: none;
	outline: none;
`;
