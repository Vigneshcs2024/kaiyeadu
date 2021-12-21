import { Transaction } from 'sequelize';
import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { Link } from './link.model';
import { ClientError } from '$api/errors';

export function addLinks(
	criminal: Criminal['id'],
	links: LinkDto[],
	transaction: Transaction
): Promise<Link[]> {
	logger.debug('Creating Links...');

	if (!links?.length) return Promise.resolve([]);

	return Link.bulkCreate(
		links.map(link => ({ criminal, ...link })),
		{ transaction }
	);
}

export function getLinks(criminal: Criminal['id'], transaction?: Transaction): Promise<Link[]> {
	return Link.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}

export async function update(id: string, details: Partial<LinkDto>) {
	const link = await Link.findByPk(id);
	if (!link) {
		throw new ClientError('Link not found', 404);
	}
	return link.update(details);
}
