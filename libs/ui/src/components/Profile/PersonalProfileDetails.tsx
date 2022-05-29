import styled from 'styled-components';
import { TabProps } from './Profile';

export function PersonalProfileDetails({ criminalData }: TabProps) {
	const calculateAge = (dob: string) => {
		const ageDifMs = Date.now() - new Date(dob).getTime();
		const ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	const calculateDob = (dob: string) => {
		return new Date(dob).toLocaleDateString();
	};

	const joinAddressDetails = (
		line1: string,
		line2: string,
		area: string,
		city: string,
		state: string
	) => {
		return `${line1}, ${line2}, ${area}, ${city}, ${state}`;
	};

	return (
		<PersonalDetailsContainer>
			<p>Alias Name: {criminalData.alias_name}</p>
			<p>
				Category: <strong>{criminalData.category}</strong>
			</p>
			<p>Gender: {criminalData.gender}</p>
			<p>Father's Name: {criminalData.father_name}</p>
			<p>Phone Number: {criminalData.phone_number}</p>
			<HorizontalContainer>
				<p>Date of Birth: {calculateDob(criminalData.dob)}</p>
				<p>Age: {calculateAge(criminalData.dob)}</p>
				<p>Height: {criminalData.height}</p>
			</HorizontalContainer>
			<HorizontalContainer style={{ justifyContent: 'flex-start' }}>
				<p>Religion: {criminalData.religion}</p>
				<p style={{ marginLeft: '28%' }}>Caste: {criminalData.caste}</p>
			</HorizontalContainer>
			<AddressContainer>
				{criminalData.addresses?.map(({ line1, line2, area, city, state, type }, index) => {
					return type === 'Native' ? (
						<div key={index}>
							<p className='addressTitle'>{type} Address: </p>
							<p>{joinAddressDetails(line1, line2, area, city, state)}</p>
						</div>
					) : type === 'Present' ? (
						<div key={index}>
							<p className='addressTitle'>{type} Address: </p>
							<p>{joinAddressDetails(line1, line2, area, city, state)}</p>
						</div>
					) : (
						<div key={index}>
							<p className='addressTitle'>{type} Address: </p>
							<p>{joinAddressDetails(line1, line2, area, city, state)}</p>
						</div>
					);
				})}
			</AddressContainer>
			<p>Identification Mark: {criminalData.identification_mark}</p>
			<p>Marital Status: {criminalData.marital_status}</p>
		</PersonalDetailsContainer>
	);
}

const AddressContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;

	& > div {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.addressTitle {
			text-align: left;
			width: 20%;
		}

		& > p {
			text-align: left;
		}
	}
`;

const HorizontalContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > p {
		margin-bottom: 0 !important;
		margin-right: 2rem;
	}
`;

const PersonalDetailsContainer = styled.div`
	margin: 0 2rem 2rem;
	padding: 2rem;
	width: 60vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	border: ${props => `1px solid ${props.theme.black}`};

	& > :not(:last-child) {
		margin-bottom: 2rem !important;
	}
`;
