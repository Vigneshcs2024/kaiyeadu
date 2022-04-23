import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
	ModifyButton,
	BackgroundContainer,
	Table,
	Loader,
	FlexLayoutWithSpace
} from '@kaiyeadu/ui/components';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useRequest } from '@kaiyeadu/hooks';

export default function PoliceStations() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const { request } = useRequest();

	const getData = async () => {
		setIsLoading(true);

		try {
			const res = await request.get(Requests.STATION_LIST);
			setData(res.data.result.stations);
			setIsLoading(false);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
			setIsLoading(false);
		}
	};

	const memoizedGetData = useCallback(getData, [request]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

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
				<Table columns={columns} data={data} />
				{isLoading && <Loader withOverlay={false} />}
				<ModifyButton path='/police-stations/add' icon='carbon:add' />
			</FlexLayoutWithSpace>
		</BackgroundContainer>
	);
}
