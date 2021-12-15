import { useMemo } from 'react';
import styled from 'styled-components';

import { BackgroundContainer, Table } from '@kaiyeadu/ui/components';

import data from './data';

export default function Requests() {
	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: 'Email Id',
				accessor: 'email_id'
			},
			{
				Header: 'Role',
				accessor: 'role'
			},
			{
				Header: 'Request',
				accessor: 'request'
			},
			{
				Header: 'Accept'
			},
			{
				Header: 'Decline'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Requests'>
			<Layout>
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