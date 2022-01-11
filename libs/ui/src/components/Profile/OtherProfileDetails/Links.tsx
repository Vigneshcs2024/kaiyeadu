import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';
import { LinkDto } from '@kaiyeadu/ui/dtos/ProfileDto';

export function Links({ links }: { links: LinkDto[] }) {
	const linksColumn = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: 'Alias Name',
				accessor: 'alias_name'
			},
			{
				Header: `Father's Name`,
				accessor: 'father_name'
			},
			{
				Header: 'City',
				accessor: 'city'
			},
			{
				Header: 'Description',
				accessor: 'description'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table columns={linksColumn} data={links} style={{ width: '100%' }} />
		</StyledScrollableTable>
	);
}
