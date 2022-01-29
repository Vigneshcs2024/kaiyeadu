import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';
import { BondDto } from '@kaiyeadu/ui/dtos';

export function Bonds({ bonds }: { bonds: BondDto[] }) {
	const bondsColumn = useMemo(
		() => [
			{
				Header: 'Type',
				accessor: 'type'
			},
			{
				Header: `Period`,
				accessor: 'period'
			},
			{
				Header: 'Active',
				accessor: 'is_active',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Cell: (row: any) => {
					return <div>{row.value === 1 ? 'Yes' : 'No'}</div>;
				}
			},
			{
				Header: 'Details',
				accessor: 'details'
			},
			{
				Header: 'Expiry',
				accessor: 'expiry',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Cell: (row: any) => {
					return <div>{new Date(row.value).toLocaleDateString()}</div>;
				}
			},
			{
				Header: 'Bound Down Details',
				accessor: 'bound_down_details'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table columns={bondsColumn} data={bonds} style={{ width: '100%' }} />
		</StyledScrollableTable>
	);
}
