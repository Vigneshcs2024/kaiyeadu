import { Transaction } from 'sequelize';
import { OccupationDto } from '@kaiyeadu/api-interfaces/dtos';
import { Occupation } from './occupation.model';

export function addOccupation(
	person: string,
	occupation: OccupationDto[],
	transaction: Transaction
): Promise<Occupation[]> {
	return Promise.all(
		occupation.map(occupation =>
			Occupation.build({ ...occupation, criminal: person }).save({ transaction })
		)
	);
}

export function getOccupationsOf(person: string, transaction?: Transaction): Promise<Occupation[]> {
	return Occupation.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
