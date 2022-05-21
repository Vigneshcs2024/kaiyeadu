import styled from 'styled-components';

import { Accordion } from '@kaiyeadu/ui/components';
import { ActiveCases } from './ActiveCases';
import { InactiveCases } from './InactiveCases';
import { TabProps } from '../Profile';
import { LastArrestDto } from '@kaiyeadu/ui/dtos';

const LastArrest = ({ lastArrest }: { lastArrest: LastArrestDto }) => {
	const { crime_number, section, kind, date } = lastArrest;
	return (
		<LastArrestContainer>
			<h3>Last Arrest Details</h3>
			<p>Crime Number: {crime_number}</p>
			<p>Section: {section}</p>
			<p>Kind: {kind}</p>
			<p>Date: {new Date(date).toLocaleDateString()}</p>
		</LastArrestContainer>
	);
};

export function CaseProfileDetails({ criminalData }: TabProps) {
	return (
		<DetailsContainer>
			{criminalData?.lastArrest && <LastArrest lastArrest={criminalData.lastArrest} />}
			<Accordion title='Active Cases'>
				<ActiveCases criminalData={criminalData} />
			</Accordion>
			<Accordion title='Inactive Cases'>
				<InactiveCases criminalData={criminalData} />
			</Accordion>
		</DetailsContainer>
	);
}

const DetailsContainer = styled.div`
	width: 60vw;
	margin: 0 2rem 2rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	border: ${props => `1px solid ${props.theme.black}`};

	& > :not(:last-child) {
		margin-bottom: 2rem !important;
	}
`;

const LastArrestContainer = styled.div`
	text-align: left !important;

	& > h3 {
		margin: 2rem 0;
	}
`;
