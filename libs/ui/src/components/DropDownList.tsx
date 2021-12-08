import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

export function DropDownList({ children, items, label, ...rest }: DDLProps) {
	if (children) throw new Error('DropDownList: children is not supported');

	return (
		<SelectContainer>
			<label htmlFor={rest.id}>{label}</label>
			<select {...rest}>
				{items.map(item =>
					typeof item === 'string' ? (
						<option key={item} value={item}>
							{item}
						</option>
					) : (
						<option key={item.id ?? item.value} value={item.value}>
							{item.label}
						</option>
					)
				)}
			</select>
		</SelectContainer>
	);
}

type Option = { label: string; value: string; id?: string };

interface DDLProps extends SelectHTMLAttributes<HTMLSelectElement> {
	id: string;
	label: string;
	items: Option[] | string[];
}

const SelectContainer = styled.div`
	font: inherit;
	display: flex;
	min-width: 45rem;
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 2em;
	}

	@media only screen and (max-width: 600px) {
		min-width: 80%;
	}

	label {
		color: ${p => p.theme.white};
		margin-bottom: 0.2em;
		font-size: 2rem;
	}

	select {
		font: inherit;
		border-radius: 0.5rem;
		padding: 1.3rem;
		outline: none;
		border: none;
	}

	option {
		font: inherit;
	}
`;
