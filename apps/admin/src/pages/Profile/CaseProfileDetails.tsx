import styled from 'styled-components';

export default function CaseProfileDetails() {
	return <DetailsContainer>Case Details</DetailsContainer>;
}

const DetailsContainer = styled.div`
	margin: 2rem;
	padding: 2rem;
	min-width: 60%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	border: ${props => `1px solid ${props.theme.black}`};

	& > :not(:last-child) {
		margin-bottom: 2rem !important;
	}
`;
