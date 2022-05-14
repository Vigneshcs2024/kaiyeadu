import { useMemo, useState, useEffect, useCallback } from 'react';

import { BackgroundContainer, Table, Loader, FlexLayoutWithSpace } from '@kaiyeadu/ui/components';
import { Layout } from '@kaiyeadu/ui/styles';
import { useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests as Req } from '@kaiyeadu/api-interfaces/constants/requests.enum';

export default function Requests() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const { request } = useRequest();

	const getRequests = async () => {
		setIsLoading(true);

		try {
			const res = await request.get(Req.PROPOSAL_LIST);
			const resUsers = await request.get(Req.USER_LIST);

			const users = resUsers.data.result.users;

			const description = res.data.result.proposals.map(
				(proposal: { created_by: string; description: string }) => {
					const user = users.find(
						(user: { id: string }) => user.id === proposal.created_by
					);
					return { request: proposal.description, email_id: user.email, ...user };
				}
			);
			setData(description);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
		}
		setIsLoading(false);
	};

	const memoizedGetData = useCallback(getRequests, [request]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

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
			{isLoading && <Loader withOverlay={false} />}
			<FlexLayoutWithSpace>
				<Table columns={columns} data={data} />
			</FlexLayoutWithSpace>
		</BackgroundContainer>
	);
}
