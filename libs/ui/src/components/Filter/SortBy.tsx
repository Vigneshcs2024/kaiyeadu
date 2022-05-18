import styled from 'styled-components';

interface SortProps {
	setSort: React.Dispatch<React.SetStateAction<string>>;
}

export function SortBy({ setSort }: SortProps) {
	return (
		<SortContainer>
			<RadioContainer>
				<input type='radio' name='sort' id='asc' onChange={() => setSort('ASC')} />
				<label htmlFor='asc'>Ascending</label>
			</RadioContainer>
			<RadioContainer>
				<input type='radio' name='sort' id='desc' onChange={() => setSort('DESC')} />
				<label htmlFor='desc'>Descending</label>
			</RadioContainer>
		</SortContainer>
	);
}

const RadioContainer = styled.div`
	margin: 0 1rem;
	& > label {
		color: ${p => p.theme.white};
	}

	& > input {
		margin-right: 1rem;
	}
`;

const SortContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: row;
`;
