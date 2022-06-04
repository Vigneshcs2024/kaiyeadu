import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

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
	const first = useRef(true);

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

				let totalPagesCalc = 0;
				if (res.data.result.total < recordCount) {
					totalPagesCalc = 1;
				} else {
					totalPagesCalc = res.data.result.total / recordCount;

					if (Number(totalPagesCalc.toString().split('.')[1]) < 5) {
						totalPagesCalc = totalPagesCalc + 1;
					} else {
						totalPagesCalc = Math.round(totalPagesCalc);
					}
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
				setData(tableValues);
				setLoading(false);
			} catch (error) {
				(error as CustomAxiosError).handleAxiosError?.();
			}
		}, 500);
	};

	const memoizedGetData = useCallback(getData, [page, request, search]);

	useLayoutEffect(() => {
		if (first.current) {
			memoizedGetData();
			first.current = false;
		}
	}, [memoizedGetData]);

	const columns = useMemo(
		() => [
			{
				Header: 'Date & Time',
				accessor: 'createdAt'
			},
			{
				Header: 'Message',
				accessor: 'log'
			}
		],
		[]
	);

	return (
		<BackgroundContainer pageTitle='Logs'>
			<Layout>
				{loading && <Loader withOverlay={true} />}
				<Searchbar setSearch={setSearch} getData={getData} />
				<Pagination page={page} setPage={setPage} totalPages={totalPages} />
				<Table columns={columns} data={data} />
			</Layout>
		</BackgroundContainer>
	);
}
