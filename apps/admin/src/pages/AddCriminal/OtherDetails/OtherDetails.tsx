import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

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
import { initialOtherDetails } from '../initialValues';
import { theme } from '@kaiyeadu/ui/base';
import {
	AssociatesDto,
	BondDto,
	LastArrestDto,
	LinkDto,
	OpPlaceDto,
	VehicleDto
} from '@kaiyeadu/api-interfaces/dtos';
import { Icon } from '@iconify/react';

interface FormikInterface {
	formik: FormikProps<typeof initialOtherDetails>;
	setStep: Dispatch<SetStateAction<number>>;
}

function BondDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const [bonds, setBonds] = useState<
		Array<
			Omit<Partial<BondDto>, 'expiry'> & {
				expiry: string;
			}
		>
	>(formik.values.bonds || []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...bonds];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof BondDto] = value;
		setBonds(list);
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const list = [...bonds];
		list[index].is_active = e.target.checked;
		setBonds(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...bonds];
		list.splice(index, 1);
		setBonds(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setBonds(old => {
			return [
				...old,
				{
					bound_down_details: '',
					details: '',
					expiry: new Date().toISOString().split('T')[0],
					is_active: true,
					period: 1,
					type: '110CRPC' || '109CRPC' || '107CRPC'
				}
			];
		});
	};

	useEffect(() => {
		formik.values.bonds = bonds;
	}, [formik.values, bonds]);

	return (
		<>
			<HeadingWithAddButton>
				<h3>Bond Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{bonds.map((bond, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<CheckBox
							label='Is Active?'
							id='is_active'
							name='is_active'
							checked={bond.is_active}
							onChange={e => handleCheckBoxChange(e, index)}
						/>
						<GridContainer>
							<TextField
								id={`bound_down_details${index}`}
								name='bound_down_details'
								label='Bound Down Details'
								type='text'
								value={bond.bound_down_details}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`details_${index}`}
								name='details'
								label='Details'
								type='text'
								value={bond.details}
								onChange={e => handleInputChange(e, index)}
							/>
							<DropDownList
								label='Type'
								id={`type_${index}`}
								name='type'
								items={['110CRPC', '109CRPC', '107CRPC']}
								value={bond.type}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`period_${index}`}
								name='period'
								label='Period'
								type='number'
								value={bond.period}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`expiry_${index}`}
								name='expiry'
								label='Expiry Date'
								type='date'
								value={bond.expiry}
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
	const [links, setLinks] = useState<LinkDto[]>(formik.values.links || []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...links];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof LinkDto] = value;
		setLinks(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...links];
		list.splice(index, 1);
		setLinks(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setLinks(old => {
			return [
				...old,
				{
					name: '',
					father_name: '',
					alias_name: '',
					city: '',
					description: ''
				}
			];
		});
	};

	useEffect(() => {
		formik.values.links = links;
	}, [formik.values, links]);

	return (
		<>
			<HeadingWithAddButton>
				<h3>Links</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{links.map((link, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<GridContainer>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={link.name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`father_name_${index}`}
								name='father_name'
								label={`Father's Name`}
								type='text'
								value={link.father_name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`alias_name_${index}`}
								name='alias_name'
								label='Alias Name'
								type='text'
								value={link.alias_name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`city_${index}`}
								name='city'
								label='City'
								type='text'
								value={link.city}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`description_${index}`}
								name='description'
								label='Description'
								type='text'
								value={link.description}
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
	const [opPlaces, setOpPlaces] = useState<OpPlaceDto[]>(formik.values.operational_places || []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const { name, value } = e.target;
		const list = [...opPlaces];
		list[index][name as keyof OpPlaceDto] = value;
		setOpPlaces(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...opPlaces];
		list.splice(index, 1);
		setOpPlaces(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setOpPlaces(old => {
			return [...old, { district: '', state: '' }];
		});
	};

	useEffect(() => {
		formik.values.operational_places = opPlaces;
	}, [formik.values, opPlaces]);

	return (
		<>
			<HeadingWithAddButton>
				<h3>Operational Places</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{opPlaces.map((opPlace, index) => {
				return (
					<OpPlacesContainer key={index}>
						<TextField
							id={`district_${index}`}
							name='district'
							label='District'
							type='text'
							value={opPlace.district}
							onChange={e => handleInputChange(e, index)}
						/>
						<TextField
							id={`state_${index}`}
							name='state'
							label='State'
							type='text'
							value={opPlace.state}
							onChange={e => handleInputChange(e, index)}
						/>
						<RemoveItemButton onClick={() => handleRemoveClick(index)} />
					</OpPlacesContainer>
				);
			})}
		</>
	);
}

function AssociateDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const [associates, setAssociates] = useState<AssociatesDto[]>(formik.values.associates || []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...associates];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof AssociatesDto] = value;
		setAssociates(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...associates];
		list.splice(index, 1);
		setAssociates(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setAssociates(old => {
			return [
				...old,
				{
					name: '',
					father_name: '',
					gender: 'Female' || 'Male' || 'Other' || 'Transgender',
					location: ''
				}
			];
		});
	};

	useEffect(() => {
		formik.values.associates = associates;
	}, [formik.values, associates]);

	return (
		<>
			<HeadingWithAddButton>
				<h3>Associate Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{associates.map((associate, index) => {
				return (
					<div key={index} style={{ position: 'relative' }}>
						<GridContainer>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={associate.name}
								onChange={e => handleInputChange(e, index)}
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
	const [vehicles, setVehicles] = useState<VehicleDto[]>(formik.values.vehicles || []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...vehicles];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof OpPlaceDto] = value;
		setVehicles(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...vehicles];
		list.splice(index, 1);
		setVehicles(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setVehicles(old => {
			return [...old, { type: 'Two-Wheeler', reg_no: '', description: '' }];
		});
	};

	useEffect(() => {
		formik.values.vehicles = vehicles;
	}, [formik.values, vehicles]);

	return (
		<>
			<HeadingWithAddButton>
				<h3>Vehicle Details</h3>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{vehicles.map((vehicle, index) => {
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
								value={vehicle.type}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`reg_no_${index}`}
								name='reg_no'
								label='Registration Number'
								type='text'
								value={vehicle.reg_no}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`description_${index}`}
								name='description'
								label='Description'
								type='text'
								value={vehicle.description}
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
						items={['A+', 'A', 'B', 'C']}
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
