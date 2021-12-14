import { Transaction } from 'sequelize';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { Associate } from './associate.model';

export function addAssociates(
	criminal: string,
	associates: AssociatesDto[],
	transaction: Transaction
): Promise<Associate[]> {
	return Associate.bulkCreate(
		associates.map(a => ({ criminal, ...a })),
		{ transaction }
	);
}

export function getAssociatesOf(criminal: string, transaction?: Transaction): Promise<Associate[]> {
	return Associate.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
