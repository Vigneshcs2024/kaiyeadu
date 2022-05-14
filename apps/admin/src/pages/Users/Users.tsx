import { useCallback, useEffect, useMemo, useState } from 'react';

import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Loader,
	FlexLayoutWithSpace,
	ActiveType,
	DeleteModal
} from '@kaiyeadu/ui/components';
import { useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';

export default function Users() {
	const [id, setId] = useState('');
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [type, setType] = useState('all');
	const { request } = useRequest();

	const getData = async (type: string) => {
		setIsLoading(true);

		try {
			const res = await request.get(
				Requests.USER_LIST + (type !== 'all' ? `?f={"role":"${type}"}` : '')
			);
			setData(res.data.result.users);
			setIsLoading(false);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
			setIsLoading(false);
		}
	};

	const showModal = (id: string) => {
		setModal(true);
		setId(id);
	};

	const memoizedGetData = useCallback(getData, [request]);

	useEffect(() => {
		memoizedGetData(type);
	}, [memoizedGetData, type]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id'
			},
			{
				Header: 'Name',
				accessor: 'name'
			},
			{
				Header: 'GPF',
				accessor: 'gpf'
			},
			{
				Header: 'Designation',
				accessor: 'designation'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Phone',
				accessor: 'phone'
			},
			{
				Header: 'Police Station',
				accessor: 'police_station_id.name'
			},
			{
				Header: 'Role',
				accessor: 'role'
			},
			{
				Header: 'Delete'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Users'>
			<FlexLayoutWithSpace>
				<ActiveType
					setType={setType}
					type={type}
					values={['all', 'admin', 'master', 'user']}
				/>
				<Table columns={columns} data={data} removeItem={showModal} />
				{isLoading && <Loader withOverlay={false} />}
				<ModifyButton path='/users/add' icon='carbon:add' />
				{modal && <DeleteModal url={`${Requests.USER_REMOVE}` + id} setModal={setModal} />}
			</FlexLayoutWithSpace>
		</BackgroundContainer>
	);
}
