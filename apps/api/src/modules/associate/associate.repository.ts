import { StatusCodes } from 'http-status-codes';
import { Transaction } from 'sequelize';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { logger } from '$api/tools';
import { Associate } from './associate.model';

export function addAssociates(
	criminal: string,
	associates: AssociatesDto[],
	transaction: Transaction
): Promise<Associate[]> {
	logger.debug('Creating Associates...');

	if (!associates?.length) return Promise.resolve([]);

	return Associate.bulkCreate(
		associates.map(a => ({ criminal, ...a })),
		{ transaction }
	);
}

export function getAssociatesOf(criminal: string, transaction?: Transaction): Promise<Associate[]> {
	return Associate.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}

export async function update(id: string, details: AssociatesDto) {
	const associate = await Associate.findByPk(id);
	if (!associate) {
		throw new ClientError(
			'The given id does not correspond to an associate',
			StatusCodes.NOT_FOUND
		);
	}

	return associate.update(details);
}
