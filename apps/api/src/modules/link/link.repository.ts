import { Transaction } from 'sequelize';
import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Link } from './link.model';

export function addLinks(
	criminal: Criminal['id'],
	links: LinkDto[],
	transaction: Transaction
): Promise<Link[]> {
	return Promise.all(
		links.map(link =>
			Link.build({
				criminal,
				...link
			}).save({ transaction })
		)
	);
}

export function getLinks(criminal: Criminal['id'], transaction: Transaction): Promise<Link[]> {
	return Link.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
