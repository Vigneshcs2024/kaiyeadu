import styled from 'styled-components';

import { OccupationDto } from '@kaiyeadu/ui/dtos';

export function Occupation({ occupation }: { occupation: OccupationDto[] }) {
	return (
		<OccupationContainer>
			{occupation.map(({ name }, index) => {
				return (
					<p key={index}>
						{index + 1}. {name}
					</p>
				);
			})}
		</OccupationContainer>
	);
}

const OccupationContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	p {
		margin: 1rem 2rem;
	}
`;
