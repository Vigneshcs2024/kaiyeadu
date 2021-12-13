import { OccupationDto } from '@kaiyeadu/api-interfaces/dtos';
import { Occupation } from './occupation.model';

export function addOccupation(person: string, occupation: OccupationDto[]): Promise<Occupation[]> {
	return Promise.all(
		occupation.map(occupation => Occupation.build({ ...occupation, criminal: person }).save())
	);
}

export function getOccupationsOf(person: string): Promise<Occupation[]> {
	return Occupation.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] }
	});
}
