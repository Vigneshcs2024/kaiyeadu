import { MouseEventHandler, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackgroundContainer, ModifyButton, Table } from '@kaiyeadu/ui/components';
import data from './data';
import { UpdateProposals } from '..';

export default function Home() {
	const [modal, setModal] = useState(false);
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

	const navigateToDetails = (e: React.MouseEvent<HTMLTableSectionElement>) => {
		navigate(`/profile`);
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			pageTitle='Home'>
			<Table columns={columns} data={data} navigateTo={navigateToDetails} />

			<ModifyButton icon='ci:edit' width='35' onClick={() => setModal(true)} />
			{modal && <UpdateProposals setModal={setModal} />}
		</BackgroundContainer>
	);
}
