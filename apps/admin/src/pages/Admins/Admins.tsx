import { useMemo } from 'react';
import styled from 'styled-components';

import { BackgroundContainer, Table } from '@kaiyeadu/ui/components';
import data from './data';
import { Layout } from '@kaiyeadu/ui/styles';

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
		<BackgroundContainer pageTitle='Admins'>
			<Layout>
				<Table columns={columns} data={data} />
			</Layout>
		</BackgroundContainer>
	);
}
