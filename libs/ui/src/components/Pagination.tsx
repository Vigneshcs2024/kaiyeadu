import styled from 'styled-components';

export function Pagination({
	page,
	setPage,
	totalPages
}: {
	page: number;
	setPage: (value: React.SetStateAction<number>) => void;
	totalPages: number;
}) {
	return (
		<PaginationContainer>
			<p>
				Page{' '}
				<input
					type='number'
					name='page'
					id='page'
					min='1'
					max={totalPages}
					value={page}
					onChange={e => {
						setPage(Number(e.target.value));
					}}
				/>{' '}
				of {totalPages}
			</p>
		</PaginationContainer>
	);
}

const PaginationContainer = styled.div`
	margin: 0 0 2rem;
	color: ${p => p.theme.white};

	& > p > input {
		margin: 0 1rem;
		width: 4rem;
		padding: 0.25rem;
		text-align: center;
		border: none;
		outline: none;
		font-family: inherit;
		font-size: 1.8rem;
	}
`;
