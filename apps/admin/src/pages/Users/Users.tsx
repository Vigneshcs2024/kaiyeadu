import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Loader,
	FlexLayoutWithSpace,
	ActiveType,
	DeleteModal,
	Pagination
} from '@kaiyeadu/ui/components';
import { useAuthApi, useRequest } from '@kaiyeadu/hooks';
import { CommonObject, CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { recordCount } from '@kaiyeadu/api-interfaces/constants';

export default function Users() {
	const [id, setId] = useState('');
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [type, setType] = useState('all');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const { request } = useRequest();
	const { session } = useAuthApi();
	const navigate = useNavigate();

	const getData = async (type: string) => {
		setIsLoading(true);

		try {
			const res = await request.get(
				Requests.USER_LIST +
					`?page=${page}&count=${recordCount}` +
					(type !== 'all' ? `&f={"role":"${type}"}` : '')
			);
			let totalPagesCalc = Math.round(res.data.result.total / recordCount);
			if (totalPagesCalc < 1) {
				totalPagesCalc = 1;
			} else {
				setTotalPages(totalPagesCalc);
			}
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

	const memoizedGetData = useCallback(getData, [page, request]);

	useEffect(() => {
		memoizedGetData(type);
	}, [memoizedGetData, type]);

	const adminColumns = useMemo(
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
				Header: 'Edit'
			},
			{
				Header: 'Delete'
			}
		],
		[]
	);

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
			}
		],
		[]
	);

	const editNavigation = (data: CommonObject) => {
		navigate('/user/edit', {
			state: data
		});
	};

	return (
		<BackgroundContainer pageTitle='Users'>
			<FlexLayoutWithSpace>
				<ActiveType
					setType={setType}
					type={type}
					values={['all', 'admin', 'master', 'user']}
				/>
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				<Table
					columns={session.getUserRole() === 'admin' ? adminColumns : columns}
					data={data}
					removeItem={showModal}
					editNavigation={editNavigation}
				/>
				{isLoading && <Loader withOverlay={false} />}
				{session.getUserRole() === 'admin' && (
					<ModifyButton path='/users/add' icon='carbon:add' />
				)}
				{modal && <DeleteModal url={`${Requests.USER_REMOVE}` + id} setModal={setModal} />}
			</FlexLayoutWithSpace>
		</BackgroundContainer>
	);
}

const PaginationContainer = styled.div`
	margin: 0 0 2rem;
	color: ${p => p.theme.white};

	& > p > input {
		margin: 0 1rem;
		width: 4rem;
		padding: 0.25rem;
		text-align: center;
		border: none;
		outline: none;
		font-family: inherit;
		font-size: 1.8rem;
	}
`;
