import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { BackgroundContainer, Loader, Pagination, Searchbar, Table } from '@kaiyeadu/ui/components';
import { Layout } from '@kaiyeadu/ui/styles';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { useRequest } from '@kaiyeadu/hooks';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { recordCount } from '@kaiyeadu/api-interfaces/constants';

interface LogResponse {
	id: string;
	log: string;
	createdAt: string;
	user_id: {
		name: string;
	};
	criminal_id: {
		name: string;
	};
	police_station_id: {
		name: string;
	};
}

export default function Logs() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [search, setSearch] = useState('');

	const { request } = useRequest();

	const getData = async () => {
		setTimeout(async () => {
			try {
				setLoading(true);
				const res = await request.get(
					Requests.LOGS_LIST +
						`?page=${page}&count=${recordCount}` +
						(search ? `&q=${search}` : '')
				);

				let totalPagesCalc = res.data.result.total / recordCount;

				if (Number(totalPagesCalc.toString().split('.')[1]) < 5) {
					totalPagesCalc = totalPagesCalc + 1;
				} else {
					totalPagesCalc = Math.round(totalPagesCalc);
				}
				setTotalPages(totalPagesCalc);

				const tableValues = res.data.result.logs.map((item: LogResponse) => {
					return {
						id: item.id,
						log: item.log,
						createdAt: new Date(item.createdAt).toLocaleString(),
						user_name: item.user_id.name,
						criminal_name: item.criminal_id ? item.criminal_id.name : null,
						police_station_name: item.police_station_id
							? item.police_station_id.name
							: null
					};
				});
				toast.success(res.data.message);
				setData(tableValues);
				setLoading(false);
			} catch (error) {
				(error as CustomAxiosError).handleAxiosError?.();
			}
		}, 500);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const memoizedGetData = useCallback(getData, [page, request]);

	useLayoutEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	const columns = useMemo(
		() => [
			{
				Header: 'User Name',
				accessor: 'user_name'
			},
			{
				Header: 'Log Message',
				accessor: 'log'
			},
			{
				Header: 'Criminal Name',
				accessor: 'criminal_name'
			},
			{
				Header: 'Police Station Name',
				accessor: 'police_station_name'
			},
			{
				Header: 'Created At',
				accessor: 'createdAt'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Admins'>
			<Layout>
				{loading && <Loader withOverlay={true} />}
				<Searchbar setSearch={setSearch} getData={getData} />
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				<Table columns={columns} data={data} />
			</Layout>
		</BackgroundContainer>
	);
}
