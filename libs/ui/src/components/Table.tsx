/* eslint-disable @typescript-eslint/ban-types */
import { useTable, useSortBy, Column } from 'react-table';
import { Icon } from '@iconify/react';

import { StyledTable } from '@kaiyeadu/ui/styles';
import { CSSProperties, MouseEventHandler } from 'react';

interface Props {
	columns: Array<Column<object>>;
	data: Array<object>;
	style?: CSSProperties;
	navigateTo?: MouseEventHandler<HTMLTableSectionElement> | undefined;
}

export default function Table({ columns, data, style, navigateTo }: Props) {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data
		},
		useSortBy
	);

	return (
		<StyledTable style={style} {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								<span>
									{column.isSorted ? (
										column.isSortedDesc ? (
											<Icon
												icon='akar-icons:arrow-up'
												rotate='90'
												width={20}
												height={20}
												color='#fff'
											/>
										) : (
											<Icon
												icon='akar-icons:arrow-up'
												width={20}
												height={20}
												color='#fff'
											/>
										)
									) : (
										''
									)}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody onClickCapture={navigateTo} {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return (
									<td align='left' {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</StyledTable>
	);
}
