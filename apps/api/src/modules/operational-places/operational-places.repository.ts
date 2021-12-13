import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { OperationalPlace } from './operational-places.model';

export function addOpPlaces(criminal: Criminal['id'], places: OpPlaceDto[]) {
	return Promise.all(places.map(place => OperationalPlace.build({ ...place, criminal }).save()));
}

export function getOpPlacesOf(criminal: Criminal['id']) {
	return OperationalPlace.findAll({ where: { criminal }, attributes: { exclude: ['criminal'] } });
}
