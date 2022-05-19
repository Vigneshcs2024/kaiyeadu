import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackgroundContainer, Table, Loader, Filter } from '@kaiyeadu/ui/components';
import { useRequest } from '@kaiyeadu/hooks';
import { CommonObject, CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { Layout } from '@kaiyeadu/ui/styles';
import styled from 'styled-components';

interface FinalFilter {
	type: string;
	value: string;
	label: string;
}

export default function Home() {
	const initialFilters = [
		{
			type: 'Caste',
			value: 'SC'
		},
		{
			type: 'Religion',
			value: 'Hindu'
		},
		{
			type: 'Grade',
			value: ['All', 'A+', 'A', 'B', 'C']
		},
		{
			type: 'Category',
			value: ['All', 'HS', 'OCIU']
		},
		{
			type: 'Marital Status',
			value: ['All', 'Married', 'Unmarried', 'Divorced', 'Widowed']
		},
		{
			type: 'Present Status',
			value: ['All', 'Active', 'Inactive', 'Dormant', 'Imprisoned', 'Unknown']
		},
		{
			type: 'Goondas',
			value: ['All', 'Yes', 'No']
		}
	];
	const [finalFilters, setFinalFilters] = useState<FinalFilter[]>([
		{
			type: 'Caste',
			value: '',
			label: 'caste'
		},
		{
			type: 'Religion',
			value: '',
			label: 'religion'
		},
		{
			type: 'Grade',
			value: '',
			label: 'grade'
		},
		{
			type: 'Category',
			value: '',
			label: 'category'
		},
		{
			type: 'Marital Status',
			value: '',
			label: 'marital_status'
		},
		{
			type: 'Present Status',
			value: '',
			label: 'present_status'
		},
		{
			type: 'Goondas',
			value: '',
			label: 'is_goondas'
		}
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<CommonObject>({});
	const count = 25;

	const { request } = useRequest();
	const navigate = useNavigate();

	const getData = async () => {
		setIsLoading(true);
		setTimeout(async () => {
			try {
				const res = await request.get(
					Requests.CRIMINAL_LIST +
						`?page=${page}&count=${count}&s={"key":"name","order":"ASC"}&f=${JSON.stringify(
							filters
						)}`
				);

				if (Math.round(res.data.result.total / count) < 1) {
					setTotalPages(1);
				} else {
					setTotalPages(Math.round(res.data.result.total / count));
				}

				const tableValues = res.data.result.criminals.map(
					(criminal: {
						dob: string;
						name: string;
						gender: string;
						hs_number: string;
						id: string;
					}) => {
						return {
							first_name: criminal.name.split(' ')[0]
								? criminal.name.split(' ')[0]
								: '-',
							last_name: criminal.name.split(' ')[1]
								? criminal.name.split(' ')[1]
								: '-',
							date_of_birth: criminal.dob.substring(0, 10),
							gender: criminal.gender,
							hs_number: criminal.hs_number,
							id: criminal.id
						};
					}
				);
				setData(tableValues);
			} catch (error) {
				(error as CustomAxiosError).handleAxiosError?.();
			}
			setIsLoading(false);
		}, 500);
	};

	const memoizedGetData = useCallback(getData, [filters, page, request]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	const columns = useMemo(
		() => [
			// Don't remove the ID column as it is used to link to the criminal details page
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
			<Layout>
				{isLoading && <Loader withOverlay={true} />}

				<Filter
					initialFilters={initialFilters}
					finalFilters={finalFilters}
					setFinalFilters={setFinalFilters}
					setData={setData}
					page={page}
					count={count}
					filters={filters}
					setFilters={setFilters}
					setTotalPages={setTotalPages}
				/>
				<PaginationContainer>
					<p>
						Page{' '}
						<input
							type='number'
							name='page'
							id='page'
							min='1'
							max={totalPages}
							value={page}
							onChange={e => {
								setPage(Number(e.target.value));
							}}
						/>{' '}
						of {totalPages}
					</p>
				</PaginationContainer>
				<Table columns={columns} data={data} navigateTo={navigateToDetails} />
			</Layout>
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
