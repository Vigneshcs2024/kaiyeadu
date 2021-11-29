import styled from 'styled-components';

export const StyledTable = styled.table`
	border-collapse: collapse;
	width: 80%;
	margin-left: 10%;
	background-color: #f2f2f2;

	td,
	th {
		border: 1px solid #ddd;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #fff;
	}

	tr:hover {
		background-color: #ddd;
	}

	th {
		padding: 0.8em;
		text-align: left;
		background-color: ${p => p.theme.primary};
		color: ${p => p.theme.white};

		svg {
			margin-left: 5px;
			margin-bottom: -5px;
		}
	}
`;
