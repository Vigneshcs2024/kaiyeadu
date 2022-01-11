import { useMemo } from 'react';

import { Table } from '@kaiyeadu/ui/components';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';
import { FamilyMemberDto } from '@kaiyeadu/ui/dtos';

export function FamilyMembers({ familyMembers }: { familyMembers: FamilyMemberDto[] }) {
	const familyMembersHeader = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: `Relation`,
				accessor: 'relation'
			},
			{
				Header: 'Description',
				accessor: 'description'
			},
			{
				Header: 'Occupation',
				accessor: 'occupation'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table columns={familyMembersHeader} data={familyMembers} style={{ width: '100%' }} />
		</StyledScrollableTable>
	);
}
