import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';
import { AssociateDto } from '@kaiyeadu/ui/dtos';

export function Associates({ associates }: { associates: AssociateDto[] }) {
	const associatesColumn = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: `Father's Name`,
				accessor: 'father_name'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'Location',
				accessor: 'location'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table columns={associatesColumn} data={associates} style={{ width: '100%' }} />
		</StyledScrollableTable>
	);
}
