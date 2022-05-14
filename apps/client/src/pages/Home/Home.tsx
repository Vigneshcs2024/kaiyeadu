import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackgroundContainer, ModifyButton, Table, Loader } from '@kaiyeadu/ui/components';
import { useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const { request } = useRequest();
	const navigate = useNavigate();

	const getData = async () => {
		setIsLoading(true);

		try {
			const res = await request.get(
				Requests.CRIMINAL_LIST +
					`?page=1&count=10&f={"is_goondas":false}&s={"key":"name","order":"DESC"}`
			);

			const tableValues = res.data.result.criminals.map(
				(criminal: {
					dob: string;
					name: string;
					gender: string;
					hs_number: string;
					id: string;
				}) => {
					return {
						id: criminal.id,
						first_name: criminal.name.split(' ')[0] ? criminal.name.split(' ')[0] : '-',
						last_name: criminal.name.split(' ')[1] ? criminal.name.split(' ')[1] : '-',
						date_of_birth: criminal.dob.substring(0, 10),
						gender: criminal.gender,
						hs_number: criminal.hs_number
					};
				}
			);
			setData(tableValues);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
		}
		setIsLoading(false);
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

	const navigateToDetails = (id: string) => {
		navigate(`/profile`, { state: id });
	};

	return (
		<BackgroundContainer
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			pageTitle='Home'>
			{isLoading && <Loader withOverlay={false} />}
			<Table columns={columns} data={data} navigateTo={navigateToDetails} />
		</BackgroundContainer>
	);
}
