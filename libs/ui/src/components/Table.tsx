/* eslint-disable @typescript-eslint/ban-types */
import { CSSProperties } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { Icon } from '@iconify/react';

import { StyledTable } from '@kaiyeadu/ui/styles';
import { RemoveItemButton } from './RemoveItemButton';

interface Props {
	columns: Array<Column<object>>;
	data: Array<object>;
	style?: CSSProperties;
	navigateTo?: (id: string) => void | undefined;
	removeItem?: (id: string) => void | undefined;
}

export default function Table({ columns, data, style, navigateTo, removeItem }: Props) {
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
						{headerGroup.headers.map(column => {
							return (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}{' '}
									{column.Header === 'ID' && column.toggleHidden()}
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
							);
						})}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr
							onClick={() => navigateTo && navigateTo(row.values.id as string)}
							{...row.getRowProps()}>
							{row.cells.map(cell => {
								if (cell.column.Header === 'Delete') {
									return (
										<td align='center' {...cell.getCellProps()}>
											<RemoveItemButton
												onClick={() =>
													removeItem &&
													removeItem(row.values.id as string)
												}
											/>
										</td>
									);
								}
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
