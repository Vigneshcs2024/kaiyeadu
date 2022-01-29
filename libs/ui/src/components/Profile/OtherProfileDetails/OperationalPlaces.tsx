import styled from 'styled-components';

import { OpPlacesDto } from '@kaiyeadu/ui/dtos';

export function OperationalPlaces({ opPlaces }: { opPlaces: OpPlacesDto[] }) {
	return (
		<OpPlacesContainer>
			{opPlaces.map(({ district, state }, index) => {
				return (
					<p key={index}>
						{index + 1}. {district + ', ' + state}
					</p>
				);
			})}
		</OpPlacesContainer>
	);
}

const OpPlacesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	p {
		margin: 1rem 2rem;
	}
`;
