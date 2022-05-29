import { AddressDto, FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FormikErrors, FormikProps } from 'formik';

import {
	AddItemButton,
	Button,
	DropDownList,
	RemoveGroupButton,
	TextField
} from '@kaiyeadu/ui/components';
import { theme } from '@kaiyeadu/ui/base';

import { initialAddressDetails } from '../initialValues';

interface FormikInterface {
	formik: FormikProps<typeof initialAddressDetails>;
	setStep: Dispatch<SetStateAction<number>>;
}

function FamilyDetails({ formik }: { formik: FormikProps<typeof initialAddressDetails> }) {
	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		formik.values.family_members.splice(index, 1);

		formik.setFieldValue('family_members', formik.values.family_members);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('family_members', [
			...formik.values.family_members,
			{
				name: '',
				relation: 'Father',
				description: '',
				occupation: ''
			}
		]);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		formik.values.family_members[index] = {
			...formik.values.family_members[index],
			[event.target.name]: event.target.value
		};

		formik.setFieldValue('family_members', formik.values.family_members);
	};

	return (
		<>
			<HeadingWithAddButton>
				<h2>Family Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{formik.values.family_members.map((_, index) => {
				return (
					<GridContainer key={index}>
						<div>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={formik.values.family_members[index]?.name}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.family_members?.[index]
										? {
												content:
													(
														formik.errors.family_members?.[
															index
														] as FormikErrors<FamilyMemberDto>
													).name ?? '',
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
								value={formik.values.family_members[index]?.description}
								onChange={e => handleChange(e, index)}
							/>
						</div>
						<div>
							<DropDownList
								label='Relation'
								id='relation'
								items={[
									'Father',
									'Mother',
									'Son',
									'Daughter',
									'Brother',
									'Sister',
									'Spouse',
									'Other'
								]}
								name='relation'
								value={formik.values.family_members[index]?.relation}
								onChange={e => handleChange(e, index)}
							/>
							<TextField
								id={`occupation_${index}`}
								name='occupation'
								label='Occupation'
								type='text'
								value={formik.values.family_members[index]?.occupation}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.family_members?.[index]
										? {
												content:
													(
														formik.errors.family_members?.[
															index
														] as FormikErrors<FamilyMemberDto>
													).occupation ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
						</div>
						<RemoveGroupButton onClick={e => handleRemoveClick(index)} />
					</GridContainer>
				);
			})}
		</>
	);
}

export function AddressDetails({ formik, setStep }: FormikInterface) {
	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		formik.values.addresses.splice(index, 1);

		formik.setFieldValue('addresses', formik.values.addresses);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('addresses', [
			...formik.values.addresses,
			{
				area: '',
				type: 'Native',
				city: '',
				state: '',
				line1: '',
				line2: ''
			}
		]);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		formik.values.addresses[index] = {
			...formik.values.addresses[index],
			[event.target.name]: event.target.value
		};
		formik.setFieldValue('addresses', formik.values.addresses);
	};

	return (
		<Container onSubmit={formik.handleSubmit}>
			<HeadingWithAddButton>
				<h2>Address Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{formik.values.addresses.map((_, index) => {
				return (
					<GridContainer key={index}>
						<div>
							<DropDownList
								label='Type'
								id='type'
								items={['Present', 'Native', 'Other']}
								name='type'
								value={formik.values.addresses[index]?.type}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.addresses?.[index]
										? {
												content:
													(
														formik.errors.addresses?.[
															index
														] as FormikErrors<AddressDto>
													).type ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`line1_${index}`}
								name='line1'
								label='Line 1'
								type='text'
								value={formik.values.addresses[index]?.line1}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.addresses?.[index]
										? {
												content:
													(
														formik.errors.addresses?.[
															index
														] as FormikErrors<AddressDto>
													).line1 ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`line2_${index}`}
								name='line2'
								label='Line 2'
								type='text'
								value={formik.values.addresses[index]?.line2}
								onChange={e => handleChange(e, index)}
							/>
						</div>
						<div>
							<TextField
								id={`area_${index}`}
								name='area'
								label='Area'
								type='text'
								value={formik.values.addresses[index]?.area}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.addresses?.[index]
										? {
												content:
													(
														formik.errors.addresses?.[
															index
														] as FormikErrors<AddressDto>
													).area ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`city_${index}`}
								name='city'
								label='City'
								type='text'
								value={formik.values.addresses[index]?.city}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.addresses?.[index]
										? {
												content:
													(
														formik.errors.addresses?.[
															index
														] as FormikErrors<AddressDto>
													).city ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
							<TextField
								id={`state_${index}`}
								name={`state`}
								label='State'
								type='text'
								value={formik.values.addresses[index]?.state}
								onChange={e => handleChange(e, index)}
								tip={
									formik.errors.addresses?.[index]
										? {
												content:
													(
														formik.errors.addresses?.[
															index
														] as FormikErrors<AddressDto>
													).state ?? '',
												color: theme.palette.danger
										  }
										: ''
								}
							/>
						</div>
						<RemoveGroupButton onClick={e => handleRemoveClick(index)} />
					</GridContainer>
				);
			})}
			<FamilyDetails formik={formik} />
			<ButtonContainer>
				<Button
					onClick={() => setStep(old => (old === 1 ? 4 : old - 1))}
					title='Prev'
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
	width: 75%;
`;

const GridContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 4rem;
	grid-row-gap: 0;
	padding: 2rem 4rem 0;
	margin: 3rem auto;
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
