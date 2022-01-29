import styled from 'styled-components';

import { AddItemButton, RemoveItemButton, Button, DropDownList, TextField } from '..';

interface Filter {
	type: string;
	value: string[] | string;
}

interface TotalFilter {
	type: Filter;
	value: string;
}

interface FilterProps {
	filters: TotalFilter[];
	setFilters: React.Dispatch<React.SetStateAction<TotalFilter[]>>;
	filterOptions: Filter[];
}

export function Filter({ filters, setFilters, filterOptions }: FilterProps) {
	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...filters];
		list.splice(index, 1);
		setFilters(list);
	};

	const handleAddClick = () => {
		setFilters(old => {
			return [
				...old,
				{
					type: filterOptions[0],
					value: ''
				}
			];
		});
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		if (name === 'type') {
			const list = [...filters];
			list[index].type = filterOptions.find(f => f.type === value) ?? { type: '', value: '' };
			list[index].value = '';
			setFilters(list);
		} else if (name === 'value') {
			const list = [...filters];
			list[index].value = value;
			setFilters(list);
		}
	};

	const handleSubmitClick = () => {
		console.log(
			filters.map(value => {
				return {
					type: value.type.type,
					value: value.value
				};
			})
		);
	};

	return (
		<Container>
			<HeadingWithAddButton>
				<h3>Filters</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{filters.map(({ type, value }, index) => {
				// console.log({
				// 	finalValue: filters.map(f => f.type.type),
				// 	initialValue: filterOptions
				// 		.filter(({ type }) => !filters.map(f => f.type.type).includes(type))
				// 		.map(({ type }) => type)
				// });

				return (
					<FilterContainer key={index}>
						{/* filter type */}
						<DropDownList
							id='type'
							name='type'
							width='40rem'
							items={filterOptions.map(({ type }) => type)}
							value={type.type}
							onChange={e => handleInputChange(e, index)}
						/>

						{/* filter value */}
						{typeof type.value !== 'string' ? (
							<DropDownList
								id='value'
								name='value'
								width='40rem'
								items={type.value as string[]}
								value={value}
								onChange={e => handleInputChange(e, index)}
							/>
						) : (
							<TextField
								type='text'
								name='value'
								id='value'
								width='40rem'
								value={value}
								onChange={e => handleInputChange(e, index)}
							/>
						)}

						<RemoveItemButton
							style={{ marginBottom: '3.5rem' }}
							onClick={_e => handleRemoveClick(index)}
						/>
					</FilterContainer>
				);
			})}
			<Button style={{ margin: '0 auto 2rem' }} onClick={handleSubmitClick}>
				Filter
			</Button>
		</Container>
	);
}

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
		margin: 2rem 2rem 0;
	}
`;

const FilterContainer = styled.div`
	width: 100%;
	margin: 2rem 0 0;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;

	& > label {
		text-align: left !important;
	}
`;

const HeadingWithAddButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	h3 {
		margin: 0 2rem;
	}
`;
