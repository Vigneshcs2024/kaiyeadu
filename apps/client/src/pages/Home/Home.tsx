import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackgroundContainer, ModifyButton, Table } from '@kaiyeadu/ui/components';
import data from './data';

export default function Home() {
	const navigate = useNavigate();
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

	const navigateToDetails = () => {
		navigate(`/profile`);
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			pageTitle='Home'>
			<Table columns={columns} data={data} navigateTo={navigateToDetails} />
		</BackgroundContainer>
	);
}
