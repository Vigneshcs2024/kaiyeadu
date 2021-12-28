import { AddressDto, FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';

import {
	AddItemButton,
	Button,
	DropDownList,
	RemoveGroupButton,
	TextField
} from '@kaiyeadu/ui/components';
import { initialAddressDetails } from '../initialValues';

interface FormikInterface {
	formik: FormikProps<typeof initialAddressDetails>;
	setStep: Dispatch<SetStateAction<number>>;
}

function FamilyDetails({ formik }: { formik: FormikProps<typeof initialAddressDetails> }) {
	const [familyMembers, setFamilyMembers] = useState<FamilyMemberDto[]>(
		formik.values.familyDetails
	);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...familyMembers];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof FamilyMemberDto] = value;
		setFamilyMembers(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...familyMembers];
		list.splice(index, 1);
		setFamilyMembers(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setFamilyMembers(old => {
			return [
				...old,
				{
					name: '',
					relation: 'Father',
					description: '',
					occupation: ''
				}
			];
		});
	};

	useEffect(() => {
		formik.values.familyDetails = familyMembers;
	}, [formik.values, familyMembers]);

	return (
		<>
			<HeadingWithAddButton>
				<h2>Family Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{familyMembers.map((member, index) => {
				return (
					<GridContainer key={index}>
						<div>
							<TextField
								id={`name_${index}`}
								name='name'
								label='Name'
								type='text'
								value={member.name}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`description_${index}`}
								name='description'
								label='Description'
								type='text'
								value={member.description}
								onChange={e => handleInputChange(e, index)}
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
								value={member.relation}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`occupation_${index}`}
								name='occupation'
								label='Occupation'
								type='text'
								value={member.occupation}
								onChange={e => handleInputChange(e, index)}
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
	const [address, setAddress] = useState<AddressDto[]>(formik.values.address);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...address];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof AssociatesDto] = value;
		setAddress(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...address];
		list.splice(index, 1);
		setAddress(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setAddress(old => {
			return [
				...old,
				{
					area: '',
					type: 'Native',
					city: '',
					state: '',
					line1: '',
					line2: ''
				}
			];
		});
	};

	useEffect(() => {
		formik.values.address = address;
	}, [formik.values, address]);

	return (
		<Container onSubmit={formik.handleSubmit}>
			<HeadingWithAddButton>
				<h2>Address Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{address.map((add, index) => {
				return (
					<GridContainer key={index}>
						<div>
							<DropDownList
								label='Type'
								id='type'
								name='type'
								items={['Present', 'Native', 'Other']}
								value={add.type}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`line1_${index}`}
								name='line1'
								label='Line 1'
								type='text'
								value={add.line1}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`line2_${index}`}
								name='line2'
								label='Line 2'
								type='text'
								value={add.line2}
								onChange={e => handleInputChange(e, index)}
							/>
						</div>
						<div>
							<TextField
								id={`area_${index}`}
								name='area'
								label='Area'
								type='text'
								value={add.area}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`city_${index}`}
								name='city'
								label='City'
								type='text'
								value={add.city}
								onChange={e => handleInputChange(e, index)}
							/>
							<TextField
								id={`state_${index}`}
								name='state'
								label='State'
								type='text'
								value={add.state}
								onChange={e => handleInputChange(e, index)}
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
