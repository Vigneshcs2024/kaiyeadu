import { useMemo } from 'react';
import styled from 'styled-components';

import { BackgroundContainer } from '@kaiyeadu/ui/components';
import Table from './Table'
import data from './data';

export default function Admins() {
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
		<BackgroundContainer>
			<Layout>
				<h1>Admins</h1>
				<Table columns={columns} data={data} />
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
