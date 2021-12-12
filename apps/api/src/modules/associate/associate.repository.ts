import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { Associate } from './associate.model';

export function addAssociates(criminal: string, associates: AssociatesDto[]): Promise<Associate[]> {
	return Promise.all(
		associates.map(associate => Associate.build({ ...associate, criminal }).save())
	);
}
