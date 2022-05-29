import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import { Icon } from '@iconify/react';

import { theme } from '@kaiyeadu/ui/base';
import { DropDownList, TextField, ImagePicker, Button } from '@kaiyeadu/ui/components';

import { initialPersonalDetails } from '../initialValues';

interface FormikInterface {
	formik: FormikProps<typeof initialPersonalDetails>;
	setStep: Dispatch<SetStateAction<number>>;
	step: number;
}

function ModusOperandi({ formik }: { formik: FormikProps<typeof initialPersonalDetails> }) {
	const [item, setItem] = useState<string>('');

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (item && !(formik.values.modus_operandi as string[]).includes(item.toLowerCase())) {
				(formik.values.modus_operandi as string[]).push(item.toLowerCase());
				setItem('');
			}
		}
	};

	const handleRemoveItem = (index: number) => {
		(formik.values.modus_operandi as string[]).splice(index, 1);
		formik.setFieldValue('modus_operandi', formik.values.modus_operandi);
	};

	return (
		<>
			<TextField
				id='modus_operandi'
				name='modus_operandi'
				label='Modus Operandi / Type of Rowdism'
				type='text'
				value={item}
				onChange={e => setItem(e.target.value)}
				onKeyPress={handleKeyPress}
				tip={{
					content: 'Enter a type and hit Enter',
					color: theme.palette.secondary
				}}
			/>
			<ListItemContainer>
				{(formik.values.modus_operandi as string[]).map((v, i) => {
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

interface PersonalDetailsI extends FormikInterface {
	setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
	imageURL: string;
}

export function PersonalDetails({ step, formik, setStep, setImage, imageURL }: PersonalDetailsI) {
	return (
		<Container onSubmit={formik.handleSubmit}>
			<h2>Personal Details</h2>
			<ImagePicker setImage={setImage} imageURL={imageURL} />
			<GridContainer>
				<div>
					<TextField
						id='name'
						name='name'
						label='Name'
						type='text'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.name && formik.errors.name
								? {
										content: formik.errors.name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='alias_name'
						name='alias_name'
						label='Alias Name'
						type='text'
						value={formik.values.alias_name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.alias_name && formik.errors.alias_name
								? {
										content: formik.errors.alias_name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='father_name'
						name='father_name'
						label={"Father's Name"}
						type='text'
						value={formik.values.father_name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.father_name && formik.errors.father_name
								? {
										content: formik.errors.father_name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Gender'
						id='gender'
						items={['Male', 'Female', 'Transgender', 'Other']}
						name='gender'
						value={formik.values.gender}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.gender && formik.errors.gender
								? {
										content: formik.errors.gender,
										color: theme.palette.danger
								  }
								: ''
						}
					/>

					<TextField
						id='dob'
						name='dob'
						label='Date Of Birth'
						type='date'
						value={
							formik.values.dob
								? new Date(formik.values.dob).toISOString().split('T')[0]
								: new Date().toISOString().split('T')[0]
						}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.dob && formik.errors.dob
								? {
										content: formik.errors.dob,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='religion'
						name='religion'
						label='Religion'
						type='text'
						value={formik.values.religion}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.religion && formik.errors.religion
								? {
										content: formik.errors.religion,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Caste'
						type='text'
						id='caste'
						name='caste'
						value={formik.values.caste}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.caste && formik.errors.caste
								? {
										content: formik.errors.caste,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
				</div>
				<div>
					<DropDownList
						label='Maritial Status'
						id='marital_status'
						name='marital_status'
						items={['Married', 'Unmarried', 'Divorced', 'Widowed']}
						value={formik.values.marital_status}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.marital_status && formik.errors.marital_status
								? {
										content: formik.errors.marital_status,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='HS Number'
						type='text'
						id='hs_number'
						name='hs_number'
						value={formik.values.hs_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.hs_number && formik.errors.hs_number
								? {
										content: formik.errors.hs_number,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Height'
						type='number'
						id='height'
						name='height'
						value={formik.values.height}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.height && formik.errors.height
								? {
										content: formik.errors.height,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Identity Marks'
						type='text'
						id='identification_mark'
						name='identification_mark'
						value={formik.values.identification_mark}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.identification_mark && formik.errors.identification_mark
								? {
										content: formik.errors.identification_mark,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Phone Number'
						type='tel'
						id='phone_number'
						name='phone_number'
						value={formik.values.phone_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.phone_number && formik.errors.phone_number
								? {
										content: formik.errors.phone_number,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<ModusOperandi formik={formik} />
				</div>
			</GridContainer>
			<ButtonContainer>
				<Button
					isActive={step > 1}
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
	width: 60%;

	@media only screen and (max-width: 760px) {
		margin: 2rem;
		min-width: 80%;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 4rem;

	@media only screen and (max-width: 760px) {
		display: flex;
		flex-direction: column;
		grid-gap: 0rem;
	}
`;

const ListItemContainer = styled.ul`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
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
