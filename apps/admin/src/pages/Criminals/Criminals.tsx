import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { Layout } from '@kaiyeadu/ui/styles';
import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Filter,
	DeleteModal,
	Pagination
} from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CommonObject } from '@kaiyeadu/ui/interface';
import { useAuthApi } from '@kaiyeadu/hooks';

interface FinalFilter {
	type: string;
	value: string;
	label: string;
}

export default function Criminals() {
	const initialFilters = [
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
			value: ['All', 'A+', 'A', 'B', 'C']
		},
		{
			type: 'Category',
			value: ['All', 'HS', 'OCIU']
		},
		{
			type: 'Marital Status',
			value: ['All', 'Married', 'Unmarried', 'Divorced', 'Widowed']
		},
		{
			type: 'Present Status',
			value: ['All', 'Active', 'Inactive', 'Dormant', 'Imprisoned', 'Unknown']
		},
		{
			type: 'Goondas',
			value: ['All', 'Yes', 'No']
		}
	];
	const [finalFilters, setFinalFilters] = useState<FinalFilter[]>([
		{
			type: 'Caste',
			value: '',
			label: 'caste'
		},
		{
			type: 'Religion',
			value: '',
			label: 'religion'
		},
		{
			type: 'Grade',
			value: '',
			label: 'grade'
		},
		{
			type: 'Category',
			value: '',
			label: 'category'
		},
		{
			type: 'Marital Status',
			value: '',
			label: 'marital_status'
		},
		{
			type: 'Present Status',
			value: '',
			label: 'present_status'
		},
		{
			type: 'Goondas',
			value: '',
			label: 'is_goondas'
		}
	]);
	const [id, setId] = useState('');
	const [modal, setModal] = useState(false);
	const [data, setData] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const { session } = useAuthApi();
	const navigate = useNavigate();
	const [filters, setFilters] = useState<CommonObject>({});

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

	const userColumns = useMemo(
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
			}
		],
		[]
	);

	const navigateToDetails = (id: string) => {
		navigate(`/profile`, { state: id });
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			pageTitle='Criminals'>
			<Layout>
				<Filter
					initialFilters={initialFilters}
					finalFilters={finalFilters}
					setFinalFilters={setFinalFilters}
					setData={setData}
					page={page}
					filters={filters}
					setFilters={setFilters}
					setTotalPages={setTotalPages}
				/>
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				<Table
					columns={session.getUserRole() === 'user' ? userColumns : columns}
					data={data}
					removeItem={showModal}
					navigateTo={navigateToDetails}
				/>
				{session.getUserRole() !== 'user' && (
					<ModifyButton path='/criminals/add' icon='carbon:add' />
				)}
				{modal && (
					<DeleteModal url={`${Requests.CRIMINAL_REMOVE}` + id} setModal={setModal} />
				)}
			</Layout>
		</BackgroundContainer>
	);
}
