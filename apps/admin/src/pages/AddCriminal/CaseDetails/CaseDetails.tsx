import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FormikErrors, FormikProps } from 'formik';

import {
	AddItemButton,
	Button,
	CheckBox,
	DropDownList,
	RemoveGroupButton,
	TextField
} from '@kaiyeadu/ui/components';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';
import { theme } from '@kaiyeadu/ui/base';
import { SelectOption } from '@kaiyeadu/ui/interface';

import { initialCaseDetails, initialOtherDetails } from '../initialValues';

interface FormikInterface {
	formik: FormikProps<typeof initialCaseDetails>;
	lastArrestFormik: FormikProps<typeof initialOtherDetails>;
	setStep: Dispatch<SetStateAction<number>>;
	step: number;
	stationList: SelectOption[];
}

export function CaseDetails({ formik, setStep, stationList }: FormikInterface) {
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		formik.values.cases[index] = {
			...formik.values.cases[index],
			[event.target.name]: event.target.value
		};

		formik.setFieldValue('cases', formik.values.cases);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		formik.values.cases.splice(index, 1);

		formik.setFieldValue('cases', formik.values.cases);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('cases', [
			...formik.values.cases,
			{
				police_station: '',
				under_section: '',
				court_name: '',
				crime_number: '',
				stage: '',
				last_hearing: new Date().toISOString().split('T')[0],
				next_hearing: new Date().toISOString().split('T')[0],
				accused_attend_status: true,
				hearing_description: '',
				remarks: '',
				is_active: true,
				date: new Date().toISOString().split('T')[0]
			}
		]);
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (e.target.name === 'accused_attend_status') {
			formik.values.cases[index].accused_attend_status = e.target.checked;
		} else {
			formik.values.cases[index].is_active = e.target.checked;
		}

		formik.setFieldValue('cases', formik.values.cases);
	};

	return (
		<Container onSubmit={formik.handleSubmit}>
			<HeadingWithAddButton>
				<h2>Case Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{formik.values.cases.map((item, index) => {
				return (
					<div style={{ position: 'relative' }} key={index}>
						<CheckBox
							label='Is this case active?'
							id='is_active'
							name='is_active'
							checked={item.is_active}
							onChange={e => handleCheckBoxChange(e, index)}
						/>
						<CaseContainer>
							<div>
								<DropDownList
									label='Name of the Police Station'
									id='police_station'
									name='police_station'
									items={['', ...stationList.map(v => v.label)]}
									value={item.police_station}
									onChange={e => handleInputChange(e, index)}
									tip={
										formik.errors.cases?.[index]
											? {
													content:
														(
															formik.errors.cases?.[
																index
															] as FormikErrors<CaseDto>
														).police_station ?? '',
													color: theme.palette.danger
											  }
											: ''
									}
								/>
								<TextField
									id='under_section'
									name='under_section'
									label='Under Section'
									type='text'
									value={item.under_section}
									onChange={e => handleInputChange(e, index)}
									tip={
										formik.errors.cases?.[index]
											? {
													content:
														(
															formik.errors.cases?.[
																index
															] as FormikErrors<CaseDto>
														).under_section ?? '',
													color: theme.palette.danger
											  }
											: ''
									}
								/>
								<TextField
									id='court_name'
									name='court_name'
									label='Name of the Court'
									type='text'
									value={item.court_name}
									onChange={e => handleInputChange(e, index)}
									tip={
										formik.errors.cases?.[index]
											? {
													content:
														(
															formik.errors.cases?.[
																index
															] as FormikErrors<CaseDto>
														).court_name ?? '',
													color: theme.palette.danger
											  }
											: ''
									}
								/>
								<TextField
									id='crime_number'
									name='crime_number'
									label='Crime Number'
									type='text'
									value={item.crime_number}
									onChange={e => handleInputChange(e, index)}
									tip={
										formik.errors.cases?.[index]
											? {
													content:
														(
															formik.errors.cases?.[
																index
															] as FormikErrors<CaseDto>
														).crime_number ?? '',
													color: theme.palette.danger
											  }
											: ''
									}
								/>

								<TextField
									id='last_hearing'
									name='last_hearing'
									label='Last Hearing'
									type='date'
									value={
										item.last_hearing
											? new Date(item.last_hearing)
													.toISOString()
													.split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<CheckBox
									label='Have the accused attended the last hearing?'
									id='accused_attend_status'
									name='accused_attend_status'
									checked={item.accused_attend_status}
									onChange={e => handleCheckBoxChange(e, index)}
								/>
							</div>
							<div>
								<TextField
									id='date'
									name='date'
									label='Date'
									type='date'
									value={
										item.date
											? new Date(item.date).toISOString().split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='stage'
									name='stage'
									label='Stage'
									type='text'
									value={item.stage}
									onChange={e => handleInputChange(e, index)}
									tip={
										formik.errors.cases?.[index]
											? {
													content:
														(
															formik.errors.cases?.[
																index
															] as FormikErrors<CaseDto>
														).stage ?? '',
													color: theme.palette.danger
											  }
											: ''
									}
								/>

								<TextField
									id='hearing_description'
									name='hearing_description'
									label='Hearing Description'
									type='text'
									value={item.hearing_description}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='next_hearing'
									name='next_hearing'
									label='Next Hearing'
									type='date'
									value={
										item.next_hearing
											? new Date(item.next_hearing)
													.toISOString()
													.split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='remarks'
									name='remarks'
									label='Remarks'
									type='text'
									value={item.remarks}
									onChange={e => handleInputChange(e, index)}
								/>
							</div>
						</CaseContainer>
						<RemoveGroupButton
							style={{ top: '3rem', right: '-3rem' }}
							onClick={e => handleRemoveClick(index)}
						/>
					</div>
				);
			})}
			<ButtonContainer>
				<Button
					onClick={() => setStep(old => (old === 1 ? 4 : old - 1))}
					title='Prev'
					type='button'
				/>
				<Button title='Submit' type='submit' />
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

const CaseContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 4rem;
	grid-row-gap: 0;
	padding: 2rem 4rem 0;
	margin: 2rem auto;
	border: 1px solid ${props => props.theme.white};

	@media only screen and (max-width: 940px) {
		display: flex;
		flex-direction: column;
	}
`;

const Container = styled.form`
	margin: 2rem auto;
	width: 75%;
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
