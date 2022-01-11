import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { TabProps } from '../Profile';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';

export function ActiveCases({ criminalData }: TabProps) {
	const activeCaseColumns = useMemo(
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
			},
			{
				Header: 'Last Hearing',
				accessor: 'last_hearing',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Cell: (row: any) => {
					return <div>{new Date(row.value).toLocaleDateString()}</div>;
				}
			},
			{
				Header: 'Next Hearing',
				accessor: 'next_hearing',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Cell: (row: any) => {
					return <div>{new Date(row.value).toLocaleDateString()}</div>;
				}
			},
			{
				Header: 'Hearing Description',
				accessor: 'hearing_description'
			},
			{
				Header: 'Hearing Status',
				accessor: 'accused_attend_status'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table
				columns={activeCaseColumns}
				data={criminalData.activeCases}
				style={{ width: '100%' }}
			/>
		</StyledScrollableTable>
	);
}
