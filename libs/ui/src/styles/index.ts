import styled from 'styled-components';

export const StyledTable = styled.table`
	border-collapse: collapse;
	width: 80%;
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

export const StyledScrollableTable = styled.div`
	padding: 1rem;
	${
		'' /* These styles are suggested for the table fill all available space in its containing element */
	}
	display: block;
	${'' /* These styles are required for a horizontaly scrollable table overflow */}
	overflow: auto;

	.table {
		border-spacing: 0;
		border: 1px solid black;

		.thead {
			${
				'' /* These styles are required for a scrollable body to align with the header properly */
			}
			overflow-y: auto;
			overflow-x: hidden;
		}

		.tbody {
			${'' /* These styles are required for a scrollable table body */}
			overflow-y: scroll;
			overflow-x: hidden;
			height: 250px;
		}

		.tr {
			:last-child {
				.td {
					border-bottom: 0;
				}
			}
			border-bottom: 1px solid black;
		}

		.th,
		.td {
			margin: 0;
			padding: 0.5rem;
			border-right: 1px solid black;

			${
				'' /* In this example we use an absolutely position resizer,
       so this is required. */
			}
			position: relative;

			:last-child {
				border-right: 0;
			}

			.resizer {
				right: 0;
				background: blue;
				width: 10px;
				height: 100%;
				position: absolute;
				top: 0;
				z-index: 1;
				${'' /* prevents from scrolling while dragging on touch devices */}
				touch-action :none;

				&.isResizing {
					background: red;
				}
			}
		}
	}
`;
