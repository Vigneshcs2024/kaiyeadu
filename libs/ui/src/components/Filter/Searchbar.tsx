import { Icon } from '@iconify/react';
import styled from 'styled-components';

interface SearchProps {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	getData: () => Promise<void>;
}

export function Searchbar({ setSearch, getData }: SearchProps) {
	return (
		<SearchbarContainer>
			<Bar
				type='text'
				name='search'
				id='search'
				onChange={e => setSearch(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && getData()}
			/>
			<SearchIcon icon='akar-icons:search' />
		</SearchbarContainer>
	);
}

const Bar = styled.input`
	padding: 1rem 2rem;
	margin: 2rem auto;
	border-radius: 10rem;
	outline: none;
	border: none;
	font-size: 2rem;
	font-family: inherit;
`;

const SearchbarContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 2rem;
`;

const SearchIcon = styled(Icon)`
	position: absolute;
	right: 2rem;
	cursor: pointer;
`;
