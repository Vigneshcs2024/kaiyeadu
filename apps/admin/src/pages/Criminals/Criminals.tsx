import { useMemo } from 'react';
import styled from 'styled-components';

import { ModifyButton, BackgroundContainer, Table } from '@kaiyeadu/ui/components';
import data from './data';

export default function Criminals() {
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
				<Table columns={columns} data={data} />
				<ModifyButton path='/criminals/add' icon='carbon:add' />
			</Layout>
		</BackgroundContainer>
	);
}

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	text-align: center;

	h1 {
		font-size: 4rem;
		margin: 1em;
		color: white;
	}
`;
