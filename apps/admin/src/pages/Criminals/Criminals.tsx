import { useMemo, useState } from 'react';

import { Layout } from '@kaiyeadu/ui/styles';
import { ModifyButton, BackgroundContainer, Table, Filter } from '@kaiyeadu/ui/components';
import data from './data';

interface Filter {
	type: string;
	value: string[] | string;
}

interface FinalFilter {
	type: Filter;
	value: string;
}

export default function Criminals() {
	const [initialFilters, setInitialFilters] = useState<Filter[]>([
		{
			type: 'Caste',
			value: 'SC'
		},
		{
			type: 'Religion',
			value: 'Hindu'
		},
		{
			type: 'Grade',
			value: ['A+', 'A', 'B', 'C']
		},
		{
			type: 'Category',
			value: ['HS', 'OCIU']
		},
		{
			type: 'Marital Status',
			value: ['Married', 'Unmarried', 'Divorced', 'Widowed']
		},
		{
			type: 'Present Status',
			value: ['Active', 'Inactive', 'Dormant', 'Imprisoned', 'Unknown']
		},
		{
			type: 'Goondas',
			value: ['Yes', 'No']
		}
	]);
	const [finalFilters, setFinalFilters] = useState<FinalFilter[]>([]);

	const columns = useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'first_name'
			},
			{
				Header: 'Last Name',
				accessor: 'last_name'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'HS Number',
				accessor: 'hs_number'
			},
			{
				Header: 'Date of Birth',
				accessor: 'date_of_birth'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Criminals'>
			<Layout>
				<Filter
					initialFilters={initialFilters}
					setInitialFilters={setInitialFilters}
					finalFilters={finalFilters}
					setFinalFilters={setFinalFilters}
				/>
				<Table columns={columns} data={data} />
				<ModifyButton path='/criminals/add' icon='carbon:add' />
			</Layout>
		</BackgroundContainer>
	);
}
