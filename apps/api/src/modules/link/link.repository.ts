import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Link } from './link.model';

export function addLinks(criminal: Criminal['id'], links: LinkDto[]): Promise<Link[]> {
	return Promise.all(
		links.map(link =>
			Link.build({
				criminal,
				...link
			}).save()
		)
	);
}
