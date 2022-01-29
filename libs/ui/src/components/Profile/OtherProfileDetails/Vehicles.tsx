import { Table } from '@kaiyeadu/ui/components';
import { VehicleDto } from '@kaiyeadu/ui/dtos';
import { StyledScrollableTable } from '@kaiyeadu/ui/styles';
import { useMemo } from 'react';

export function Vehicles({ vehicles }: { vehicles: VehicleDto[] }) {
	const vehicleColumns = useMemo(
		() => [
			{
				Header: 'Type',
				accessor: 'type'
			},
			{
				Header: 'Registration Number',
				accessor: 'reg_no'
			},
			{
				Header: `Description`,
				accessor: 'description'
			}
		],
		[]
	);
	return (
		<StyledScrollableTable>
			<Table columns={vehicleColumns} data={vehicles} style={{ width: '100%' }} />
		</StyledScrollableTable>
	);
}
