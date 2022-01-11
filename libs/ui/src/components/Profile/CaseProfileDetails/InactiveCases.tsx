import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { TabProps } from '../Profile';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';

export function InactiveCases({ criminalData }: TabProps) {
	const inactiveCaseColumns = useMemo(
		() => [
			{
				Header: 'Crime Number',
				accessor: 'crime_number'
			},
			{
				Header: 'Under Section',
				accessor: 'under_section'
			},
			{
				Header: 'Police Station',
				accessor: 'police_station'
			},
			{
				Header: 'Stage',
				accessor: 'stage'
			},
			{
				Header: 'Remarks',
				accessor: 'remarks'
			},
			{
				Header: 'Date',
				accessor: 'date',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Cell: (row: any) => {
					return <div>{new Date(row.value).toLocaleDateString()}</div>;
				}
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table
				columns={inactiveCaseColumns}
				data={criminalData.cases}
				style={{ width: '100%' }}
			/>
		</StyledScrollableTable>
	);
}
