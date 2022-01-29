import { useMemo } from 'react';
import styled from 'styled-components';

import { BackgroundContainer, Table } from '@kaiyeadu/ui/components';

import data from './data';
import { Layout } from '@kaiyeadu/ui/styles';

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
