import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { LastArrest } from './last-arrest.model';

export function addLastArrest(criminal: Criminal['id'], lastArrest: LastArrestDto) {
	return LastArrest.build({ ...lastArrest, criminal }).save();
}
