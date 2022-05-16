import { Icon } from '@iconify/react';
import styled from 'styled-components';

export function Searchbar() {
	return (
		<>
			<Bar type='text' name='search' id='search' />
			{/* <Icon /> */}
		</>
	);
}

const Bar = styled.input`
	padding: 1rem 4rem;
	margin: 2rem auto;
	border-radius: 10rem;
	outline: none;
	border: none;
	font-size: 2rem;
	font-family: inherit;
`;
