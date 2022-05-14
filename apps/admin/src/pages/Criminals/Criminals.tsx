import { useMemo, useState } from 'react';

import { Layout } from '@kaiyeadu/ui/styles';
import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Filter,
	DeleteModal
} from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import data from './data';

interface Filter {
	type: string;
	value: string[] | string;
}

// const sample = [
// 	{ type: 'Religion', value: 'hindu' },
// 	{ type: 'Grade', value: 'A_PLUS' }
// ];

interface TotalFilter {
	type: Filter;
	value: string;
}

const filterOptions: Filter[] = [
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
];

export default function Criminals() {
	const [filters, setFilters] = useState<TotalFilter[]>([]);

	const [id, setId] = useState('');
	const [modal, setModal] = useState(false);

	const showModal = (id: string) => {
		setModal(true);
		setId(id);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id'
			},
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
			},
			{
				Header: 'Delete'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Criminals'>
			<Layout>
				<Filter filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
				<Table columns={columns} data={data} removeItem={showModal} />
				<ModifyButton path='/criminals/add' icon='carbon:add' />
				{modal && (
					<DeleteModal url={`${Requests.CRIMINAL_REMOVE}` + id} setModal={setModal} />
				)}
			</Layout>
		</BackgroundContainer>
	);
}
