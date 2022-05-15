import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormikErrors, FormikProps } from 'formik';

import {
	AddItemButton,
	Button,
	CheckBox,
	DropDownList,
	RemoveGroupButton,
	RemoveItemButton,
	TextArea,
	TextField
} from '@kaiyeadu/ui/components';
import { theme } from '@kaiyeadu/ui/base';
import {
	AssociatesDto,
	BondDto,
	LinkDto,
	OpPlaceDto,
	VehicleDto
} from '@kaiyeadu/api-interfaces/dtos';
import { Icon } from '@iconify/react';

import { initialOtherDetails } from '../initialValues';

interface FormikInterface {
	formik: FormikProps<typeof initialOtherDetails>;
	setStep: Dispatch<SetStateAction<number>>;
}

function BondDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		formik.values.bonds[index] = {
			...formik.values.bonds[index],
			[event.target.name]: event.target.value
		};

		formik.setFieldValue('bonds', formik.values.bonds);
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		formik.values.bonds[0].is_active = e.target.checked;
		formik.setFieldValue('bonds', formik.values.bonds);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		formik.values.bonds.splice(index, 1);

		formik.setFieldValue('bonds', formik.values.bonds);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('bonds', [
			...formik.values.bonds,
			{
				bound_down_details: '',
				details: '',
				expiry: new Date().toISOString().split('T')[0],
				is_active: true,
				period: 1,
				type: '110CRPC'
			}
		]);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h3>Bond Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{formik.values.bonds.map((_, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<CheckBox
							label='Is Active?'
							id='is_active'
							name='is_active'
							checked={formik.values.bonds[index].is_active}
							onChange={e => handleCheckBoxChange(e, index)}
						/>
						<GridContainer>
							<TextField
								id={`bound_down_details${index}`}
								name='bound_down_details'
								label='Bound Down Details'
								type='text'
								value={formik.values.bonds[index].bound_down_details}
								tip={
									formik.errors?.bonds?.[index]
										? {
												content:
													(
														formik.errors.bonds?.[
															index
														] as FormikErrors<BondDto>
													).bound_down_details ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`details_${index}`}
								name='details'
								label='Details'
								type='text'
								value={formik.values.bonds[index].details}
								onChange={e => handleInputChange(e, index)}
							/>
							<DropDownList
								label='Type'
								id={`type_${index}`}
								name='type'
								items={['110CRPC', '109CRPC', '107CRPC']}
								value={formik.values.bonds[index].type}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`period_${index}`}
								name='period'
								label='Period'
								type='number'
								value={formik.values.bonds[index].period}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`expiry_${index}`}
								name='expiry'
								label='Expiry Date'
								type='date'
								value={formik.values.bonds[index].expiry}
								onChange={e => handleInputChange(e, index)}
							/>
						</GridContainer>
						<RemoveGroupButton
							style={{ top: '3rem' }}
							onClick={e => handleRemoveClick(index)}
						/>
					</div>
				);
			})}
		</>
	);
}

function LinkDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		(formik.values.links as LinkDto[])[index] = {
			...(formik.values.links as LinkDto[])[index],
			[event.target.name]: event.target.value
		};

		formik.setFieldValue('links', formik.values.links);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		(formik.values.links as LinkDto[]).splice(index, 1);

		formik.setFieldValue('links', formik.values.links);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('links', [
			...(formik.values.links as LinkDto[]),
			{
				name: '',
				father_name: '',
				alias_name: '',
				city: '',
				description: ''
			}
		]);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h3>Links</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{(formik.values.links as LinkDto[]).map((val, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<GridContainer>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={val.name}
								onChange={e => handleInputChange(e, index)}
								tip={
									formik.errors.links?.[index]
										? {
												content:
													(
														formik.errors.links?.[
															index
														] as FormikErrors<LinkDto>
													).name ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`father_name_${index}`}
								name='father_name'
								label={`Father's Name`}
								type='text'
								value={val.father_name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`alias_name_${index}`}
								name='alias_name'
								label='Alias Name'
								type='text'
								value={val.alias_name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`city_${index}`}
								name='city'
								label='City'
								type='text'
								value={val.city}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`description_${index}`}
								name='description'
								label='Description'
								type='text'
								value={val.description}
								onChange={e => handleInputChange(e, index)}
							/>
						</GridContainer>
						<RemoveGroupButton onClick={e => handleRemoveClick(index)} />
					</div>
				);
			})}
		</>
	);
}

function OperationalPlaces({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		(formik.values.operational_places as OpPlaceDto[])[index] = {
			...(formik.values.operational_places as OpPlaceDto[])[index],
			[event.target.name]: event.target.value
		};
		formik.setFieldValue('operational_places', formik.values.operational_places);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		(formik.values.operational_places as OpPlaceDto[]).splice(index, 1);

		formik.setFieldValue('operational_places', formik.values.operational_places);
	};

	const handleAddClick = () => {
		formik.setFieldValue('operational_places', [
			...(formik.values.operational_places as OpPlaceDto[]),
			{
				state: '',
				district: ''
			}
		]);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h3>Operational Places</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{(formik.values.operational_places as OpPlaceDto[]).map((opPlace, index) => {
				return (
					<OpPlacesContainer key={index}>
						<TextField
							id={`district_${index}`}
							name='district'
							label='District'
							type='text'
							value={opPlace.district}
							onChange={e => handleInputChange(e, index)}
							tip={
								formik.errors.operational_places
									? {
											content:
												(
													formik.errors.operational_places[
														index
													] as FormikErrors<OpPlaceDto>
												)?.district ?? '',
											color: theme.palette.danger
									  }
									: ''
							}
						/>
						<TextField
							id={`state_${index}`}
							name='state'
							label='State'
							type='text'
							value={opPlace.state}
							onChange={e => handleInputChange(e, index)}
							tip={
								formik.errors.operational_places
									? {
											content:
												(
													formik.errors.operational_places[
														index
													] as FormikErrors<OpPlaceDto>
												)?.state ?? '',
											color: theme.palette.danger
									  }
									: ''
							}
						/>
						<RemoveItemButton onClick={() => handleRemoveClick(index)} />
					</OpPlacesContainer>
				);
			})}
		</>
	);
}

function AssociateDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		(formik.values.associates as AssociatesDto[])[index] = {
			...(formik.values.associates as AssociatesDto[])[index],
			[event.target.name]: event.target.value
		};
		formik.setFieldValue('associates', formik.values.associates);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		(formik.values.associates as AssociatesDto[]).splice(index, 1);

		formik.setFieldValue('associates', formik.values.associates);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('associates', [
			...(formik.values.associates as AssociatesDto[]),
			{
				name: '',
				father_name: '',
				gender: 'Female',
				location: ''
			}
		]);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h3>Associate Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{(formik.values.associates as AssociatesDto[]).map((associate, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<GridContainer>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={associate?.name}
								onChange={e => handleInputChange(e, index)}
								tip={
									formik.errors.associates
										? {
												content:
													(
														formik.errors.associates[
															index
														] as FormikErrors<AssociatesDto>
													)?.name ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`father_name_${index}`}
								name='father_name'
								label={`Father's Name`}
								type='text'
								value={associate.father_name}
								onChange={e => handleInputChange(e, index)}
							/>
							<DropDownList
								label='Gender'
								id={`gender_${index}`}
								name='gender'
								items={['Male', 'Female', 'Transgender', 'Other']}
								value={associate.gender}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`location_${index}`}
								name='location'
								label='Location'
								type='text'
								value={associate.location}
								onChange={e => handleInputChange(e, index)}
							/>
						</GridContainer>
						<RemoveGroupButton onClick={e => handleRemoveClick(index)} />
					</div>
				);
			})}
		</>
	);
}

function VehicleDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		(formik.values.vehicles as VehicleDto[])[index] = {
			...(formik.values.vehicles as VehicleDto[])[index],
			[event.target.name]: event.target.value
		};
		formik.setFieldValue('vehicles', formik.values.vehicles);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		(formik.values.vehicles as VehicleDto[]).splice(index, 1);

		formik.setFieldValue('vehicles', formik.values.vehicles);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('vehicles', [
			...(formik.values.vehicles as VehicleDto[]),
			{ type: 'Two-Wheeler', reg_no: '', description: '' }
		]);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h3>Vehicle Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{(formik.values.vehicles as VehicleDto[]).map((vehicle, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<GridContainer>
							<DropDownList
								label='Type'
								id='type'
								name='type'
								items={[
									'Two-Wheeler',
									'Three-Wheeler',
									'Four-Wheeler',
									'Heavy Vehicle'
								]}
								value={(formik.values.vehicles as VehicleDto[])[index].type}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`reg_no_${index}`}
								name='reg_no'
								label='Registration Number'
								type='text'
								value={(formik.values.vehicles as VehicleDto[])[index].reg_no}
								onChange={e => handleInputChange(e, index)}
								tip={
									formik.errors.vehicles
										? {
												content:
													(
														formik.errors.vehicles[
															index
														] as FormikErrors<VehicleDto>
													).reg_no ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`description_${index}`}
								name='description'
								label='Description'
								type='text'
								value={(formik.values.vehicles as VehicleDto[])[index].description}
								onChange={e => handleInputChange(e, index)}
							/>
						</GridContainer>
						<RemoveGroupButton onClick={e => handleRemoveClick(index)} />
					</div>
				);
			})}
		</>
	);
}

function OccupationDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const [item, setItem] = useState<string>('');
	const [list, setList] = useState<string[]>(formik.values.occupation || []);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			list.push(item);
			setItem('');
		}
	};

	const handleRemoveItem = (index: number) => {
		const items = [...list];
		items.splice(index, 1);
		setList(items);
	};

	useEffect(() => {
		const str = item.trim();
		if (str === '') {
			if (list[0] && list[0].length === 1) {
				setList([]);
			}
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item]);

	useEffect(() => {
		formik.values.occupation = list;
	}, [formik.values, list]);

	return (
		<>
			<TextField
				id='occupation'
				name='occupation'
				label='Occupation'
				type='text'
				value={item}
				onChange={e => setItem(e.target.value)}
				onKeyPress={handleKeyPress}
				tip={{
					content: 'Enter a occupation and hit Enter',
					color: theme.palette.secondary
				}}
			/>
			<ListItemContainer>
				{list.map((v, i) => {
					return (
						<ListItem key={i}>
							{v}
							<button type='button' onClick={e => handleRemoveItem(i)}>
								<Icon icon='clarity:window-close-line' width='15' />
							</button>
						</ListItem>
					);
				})}
			</ListItemContainer>
		</>
	);
}

export function OtherDetails({ formik, setStep }: FormikInterface) {
	return (
		<Container onSubmit={formik.handleSubmit}>
			<h2>Other Details</h2>
			<GridContainer>
				<div>
					<DropDownList
						label='Category'
						id='category'
						name='category'
						items={['HS', 'OCIU']}
						value={formik.values.category}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.category && formik.errors.category
								? {
										content: formik.errors.category,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Grade'
						id='grade'
						name='grade'
						items={['A_PLUS', 'A', 'B', 'C']}
						value={formik.values.grade}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.grade && formik.errors.grade
								? {
										content: formik.errors.grade,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Present Status'
						id='present_status'
						items={[
							'Active',
							'Dormant',
							'Inactive',
							'Absconded',
							'Imprisoned',
							'Unknown'
						]}
						name='present_status'
						value={formik.values.present_status}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.present_status && formik.errors.present_status
								? {
										content: formik.errors.present_status,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
				</div>
				<div>
					<TextField
						id='advocate_name'
						name='advocate_name'
						label='Advocate Name'
						type='text'
						value={formik.values.advocate_name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.advocate_name && formik.errors.advocate_name
								? {
										content: formik.errors.advocate_name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='bank_account_number'
						name='bank_account_number'
						label='Bank Account Number'
						type='text'
						value={formik.values.bank_account_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.bank_account_number && formik.errors.bank_account_number
								? {
										content: formik.errors.bank_account_number,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Goondas Initiated?'
						id='is_goondas'
						items={[
							{ value: 'true', label: 'Yes' },
							{ value: 'false', label: 'No' }
						]}
						name='is_goondas'
						value={formik.values.is_goondas}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.is_goondas && formik.errors.is_goondas
								? {
										content: formik.errors.is_goondas,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
				</div>
			</GridContainer>
			<OccupationDetails formik={formik} />
			<OperationalPlaces formik={formik} />
			<AssociateDetails formik={formik} />
			<VehicleDetails formik={formik} />
			<BondDetails formik={formik} />
			<LinkDetails formik={formik} />
			<TextArea
				id='remarks'
				name='remarks'
				label='Remarks'
				value={formik.values.remarks}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				tip={
					formik.touched.remarks && formik.errors.remarks
						? {
								content: formik.errors.remarks,
								color: theme.palette.danger
						  }
						: ''
				}
			/>
			<ButtonContainer>
				<Button
					title='Prev'
					onClick={() => setStep(old => (old === 1 ? 4 : old - 1))}
					type='button'
				/>
				<Button title='Next' type='submit' />
			</ButtonContainer>
		</Container>
	);
}

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
`;

const Container = styled.form`
	margin: 2rem auto;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 4rem;
	grid-row-gap: 0;
	margin: 2rem auto;
	padding: 2rem 4rem 0;
	border: 1px solid ${props => props.theme.white};

	@media only screen and (max-width: 940px) {
		display: flex;
		flex-direction: column;
	}
`;

const HeadingWithAddButton = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;

const ListItemContainer = styled.ul`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ListItem = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto 1rem 1rem;
	background-color: ${p => p.theme.lightGrey};
	padding: 1rem;
	color: ${p => p.theme.black};
	border-radius: 1rem;

	button {
		margin-left: 0.5rem;
		padding: 0.15rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		outline: none;
		background-color: ${p => p.theme.slate}50;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s;

		:hover {
			background-color: ${p => p.theme.slate}85;
		}
	}
`;

const OpPlacesContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr min-content;
	grid-column: 1 / 3;
	grid-gap: 4rem;
`;
