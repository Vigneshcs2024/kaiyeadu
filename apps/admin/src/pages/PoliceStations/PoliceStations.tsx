import { useCallback, useEffect, useMemo, useState } from 'react';

import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Loader,
	FlexLayoutWithSpace,
	Pagination
} from '@kaiyeadu/ui/components';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useAuthApi, useRequest } from '@kaiyeadu/hooks';
import { DeleteModal } from '@kaiyeadu/ui/components';
import { recordCount } from '@kaiyeadu/api-interfaces/constants';

export default function PoliceStations() {
	const [id, setId] = useState('');
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const { request } = useRequest();
	const { session } = useAuthApi();

	const getData = async () => {
		setIsLoading(true);
		try {
			const res = await request.get(
				Requests.STATION_LIST + `?page=${page}&count=${recordCount}`
			);

			let totalPagesCalc = Math.round(res.data.result.total / recordCount);
			if (totalPagesCalc < 1) {
				totalPagesCalc = 1;
			} else {
				setTotalPages(totalPagesCalc);
			}
			setData(res.data.result.stations);
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
		memoizedGetData();
	}, [memoizedGetData]);

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
				Header: 'Area',
				accessor: 'area'
			},
			{
				Header: 'District',
				accessor: 'district'
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
				Header: 'Area',
				accessor: 'area'
			},
			{
				Header: 'District',
				accessor: 'district'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Police Stations'>
			<FlexLayoutWithSpace>
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				<Table
					columns={session.getUserRole() === 'admin' ? adminColumns : columns}
					data={data}
					removeItem={showModal}
				/>
				{isLoading && <Loader withOverlay={false} />}
				{session.getUserRole() === 'admin' && (
					<ModifyButton path='/police-stations/add' icon='carbon:add' />
				)}
				{modal && (
					<DeleteModal url={`${Requests.STATION_REMOVE}` + id} setModal={setModal} />
				)}
			</FlexLayoutWithSpace>
		</BackgroundContainer>
	);
}
