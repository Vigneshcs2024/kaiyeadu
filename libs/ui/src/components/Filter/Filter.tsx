import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useRequest } from '@kaiyeadu/hooks';
import { CommonObject, CustomAxiosError } from '@kaiyeadu/ui/interface';
import { useCallback, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, DropDownList, TextField } from '..';
import { Accordion } from '../Accordion';
import { Loader } from '../Loader';
import { Searchbar } from './Searchbar';
import { SortBy } from './SortBy';

interface Filter {
	type: string;
	value: string[] | string;
}

interface FinalFilter {
	type: string;
	value: string;
	label: string;
}

interface FilterProps {
	finalFilters: FinalFilter[];
	setFinalFilters: React.Dispatch<React.SetStateAction<FinalFilter[]>>;
	initialFilters: Filter[];
	setData: React.Dispatch<React.SetStateAction<never[]>>;
	page: number;
	count: number;
	filters: CommonObject;
	setFilters: React.Dispatch<React.SetStateAction<CommonObject>>;
	setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export function Filter({
	finalFilters,
	setFinalFilters,
	initialFilters,
	setData,
	page,
	count,
	filters,
	setFilters,
	setTotalPages
}: FilterProps) {
	const [checked, setChecked] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
		false,
		false
	]);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('ASC');
	const [isLoading, setIsLoading] = useState(false);

	finalFilters.forEach(({ label, value }, index) => {
		if (value === 'All') {
			checked[index] = false;
			delete filters[label];
		}

		if (value !== '' && value !== 'All') {
			if (value === 'A+') {
				value = 'A_PLUS';
			}
			filters[label] = value;
		}
	});

	const { request } = useRequest();

	const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target;
		const list = [...finalFilters];
		// eslint-disable-next-line array-callback-return
		list.map((val, i) => {
			if (val.type === name) {
				list[i].value = value;
			}
		});
		setFinalFilters(list);
	};

	const getData = async () => {
		setIsLoading(true);
		try {
			const res = await request.get(
				Requests.CRIMINAL_FILTER +
					`page=${page}&count=${count}&s={"key":"name","order":"${sort}"}&f=${JSON.stringify(
						filters
					)}&q=${search}`
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
					present_status: string;
					id: string;
					image_url: string;
				}) => {
					return {
						first_name: criminal.name.split(' ')[0] ? criminal.name.split(' ')[0] : '-',
						last_name: criminal.name.split(' ')[1] ? criminal.name.split(' ')[1] : '-',
						date_of_birth: criminal.dob.substring(0, 10),
						gender: criminal.gender,
						hs_number: criminal.hs_number,
						present_status: criminal.present_status,
						id: criminal.id,
						image_url: criminal.image_url
					};
				}
			);
			setData(tableValues);
			setIsLoading(false);
		} catch (err) {
			(err as CustomAxiosError).handleAxiosError?.();
		}
	};

	const memoizedGetData = useCallback(getData, [
		request,
		page,
		count,
		sort,
		filters,
		search,
		setData,
		setTotalPages
	]);

	useLayoutEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	return (
		<>
			{isLoading && <Loader withOverlay={true} />}
			<SearchContainer>
				<Searchbar setSearch={setSearch} getData={getData} />
				<SortBy setSort={setSort} />
			</SearchContainer>
			<Accordion title='Filters' style={{ marginBottom: '2rem', boxShadow: 'none' }}>
				<Container>
					<AvaliableFilters>
						<p style={{ fontWeight: 'bold', fontSize: '1.85rem' }}>
							Available Filters:
						</p>
						<div>
							{initialFilters.map(({ type }, i) => {
								return (
									<FilterCheckbox>
										<input
											type='checkbox'
											name={type}
											id={type}
											checked={checked[i]}
											onChange={() => {
												setChecked(old => {
													const list = [...old];
													list[i] = !list[i];
													return list;
												});
											}}
										/>
										<label htmlFor={type}>{type}</label>
									</FilterCheckbox>
								);
							})}
						</div>
					</AvaliableFilters>
					<FilterContainer>
						{initialFilters.map(({ type, value }, index) => {
							return (
								checked[index] && (
									<FilterDiv>
										<h4>{type}</h4>

										{typeof value !== 'string' ? (
											<DropDownList
												id={type}
												name={type}
												items={value as string[]}
												value={finalFilters[index].value}
												onChange={e => handleInputChange(e)}
											/>
										) : (
											<TextField
												type='text'
												name={type}
												id={type}
												value={finalFilters[index].value}
												onChange={e => handleInputChange(e)}
											/>
										)}
									</FilterDiv>
								)
							);
						})}
					</FilterContainer>
					<Button style={{ margin: '0 auto 2rem' }} onClick={getData}>
						Filter
					</Button>
				</Container>
			</Accordion>
		</>
	);
}

const AvaliableFilters = styled.div`
	width: 100%;

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	border: 1px solid ${props => props.theme.white};
	padding: 1rem;
	min-width: 80vw;
	margin: 2rem;
	color: ${props => props.theme.white};

	h3 {
		width: 100%;
		margin: 2rem;
		text-align: center;
		font-size: 2.5rem;
	}
`;

const FilterCheckbox = styled.div`
	margin: 1.5rem 1rem 0;

	& > input {
		margin-right: 1rem;
	}
`;

const FilterContainer = styled.div`
	width: 100%;
	padding: 2rem;
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;

	& > label {
		text-align: left !important;
	}
`;

const FilterDiv = styled.div`
	& > h4 {
		text-align: left;
		margin-bottom: 1rem;
	}
`;

const SearchContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
