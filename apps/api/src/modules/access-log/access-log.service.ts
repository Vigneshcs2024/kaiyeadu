import { Response } from 'express';
import { ApiRequest } from '$api/types';
import { StatusCodes } from 'http-status-codes';
import { AccessLog } from './access-log.model';
import { Criminal, PoliceStation, User } from '../models';

export async function listLogs(_req: ApiRequest, res: Response) {
	// $ - Criminal
	// & - User
	// / - Police Station

	const logs = await AccessLog.findAll({
		attributes: { include: ['log', 'createdAt'] },
		include: [
			{
				model: Criminal,
				as: 'criminal_id',
				attributes: ['name']
			},
			{
				model: User,
				as: 'user_id',
				attributes: ['name']
			},
			{
				model: PoliceStation,
				as: 'police_station_id',
				attributes: ['name']
			}
		]
	});

	logs.map(value => {
		if (value.log.includes('$')) {
			value.log = value.log.replace('$', value?.criminal_id.name);
		} else if (value.log.includes('&')) {
			value.log = value.log.replace('&', value?.user_id.name);
		} else if (value.log.includes('/')) {
			value.log = value.log.replace('/', value?.police_station_id.name);
		} else {
			return;
		}
		return value;
	});

	return res.status(StatusCodes.OK).json({ message: 'Logs fetched from DB', result: logs });
}
