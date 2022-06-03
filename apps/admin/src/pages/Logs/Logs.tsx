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

	const countDecimals = function (value: number) {
		const text = value.toString();
		// verify if number 0.000005 is represented as "5e-6"
		if (text.indexOf('e-') > -1) {
			const [, trail] = text.split('e-');
			const deg = parseInt(trail, 10);
			return deg;
		}
		// count decimals for number in representation like "0.123456"
		if (Math.floor(value) !== value) {
			return value.toString().split('.')[1].length || 0;
		}
		return 0;
	};

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

				if (countDecimals(totalPagesCalc) > 0) {
					totalPagesCalc = Math.round(totalPagesCalc) + 1;
				}
				if (totalPagesCalc < 1) {
					totalPagesCalc = 1;
				} else {
					setTotalPages(totalPagesCalc);
				}

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
