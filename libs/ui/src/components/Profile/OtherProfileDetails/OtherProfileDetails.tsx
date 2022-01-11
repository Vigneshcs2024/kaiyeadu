import { Accordion } from '@kaiyeadu/ui/components';
import styled from 'styled-components';

import { TabProps } from '../Profile';
import {
	Associates,
	Bonds,
	FamilyMembers,
	Links,
	Occupation,
	OperationalPlaces,
	Vehicles
} from './index';

export function OtherProfileDetails({ criminalData }: TabProps) {
	return (
		<DetailsContainer>
			<p>Advocate Name: {criminalData.advocate_name}</p>
			{criminalData.bank_account_number && (
				<p>Bank Account Number: {criminalData.bank_account_number}</p>
			)}
			<p>Remarks: {criminalData.remarks}</p>
			<Accordion title='Associates'>
				<Associates associates={criminalData.associates} />
			</Accordion>
			<Accordion title='Family Members'>
				<FamilyMembers familyMembers={criminalData.familyMembers} />
			</Accordion>
			<Accordion title='Links'>
				<Links links={criminalData.links} />
			</Accordion>
			<Accordion title='Operational Places'>
				<OperationalPlaces opPlaces={criminalData.operationalPlaces} />
			</Accordion>
			<Accordion title='Vehicles'>
				<Vehicles vehicles={criminalData.vehicles} />
			</Accordion>
			<Accordion title='Occupation'>
				<Occupation occupation={criminalData.occupation} />
			</Accordion>
			<Accordion title='Bonds'>
				<Bonds bonds={criminalData.bonds} />
			</Accordion>
		</DetailsContainer>
	);
}

const DetailsContainer = styled.div`
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
