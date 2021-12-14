import { Transaction } from 'sequelize';
import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Link } from './link.model';

export function addLinks(
	criminal: Criminal['id'],
	links: LinkDto[],
	transaction: Transaction
): Promise<Link[]> {
	return Link.bulkCreate(
		links.map(link => ({ criminal, ...link })),
		{ transaction }
	);
}

export function getLinks(criminal: Criminal['id'], transaction: Transaction): Promise<Link[]> {
	return Link.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
