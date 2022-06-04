import { Response } from 'express';
import { ApiRequest } from '$api/types';
import { StatusCodes } from 'http-status-codes';
import { AccessLog } from './access-log.model';
import { Criminal, PoliceStation, User } from '../models';
import { jsonPrettyPrint } from '$api/utilities';
import { logger } from '$api/tools';
import { Op } from 'sequelize/dist';

export async function listLogs(req: ApiRequest, res: Response) {
	// $ - Criminal
	// & - User
	// / - Police Station

	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);

	const options = {
		count: +mp.get('count'),
		page: +mp.get('page'),
		q: mp.get('q')
	};

	logger.debug(jsonPrettyPrint(options));

	const queryParams = {
		pagination: {
			pageNumber: +options.page,
			resultsPerPage: +options.count
		},
		params: {
			search: options.q
		}
	};

	const logsCount = await AccessLog.count({
		where: {
			log: {
				[Op.like]: `%${queryParams.params.search ?? ''}%`
			}
		}
	});

	const logs = await AccessLog.findAll({
		attributes: { exclude: ['updatedAt', 'userId', 'criminalId', 'policeStationId'] },
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
		],
		where: {
			log: {
				[Op.like]: `%${queryParams.params.search ?? ''}%`
			}
		},
		offset:
			(queryParams.pagination.pageNumber - 1) * queryParams.pagination.resultsPerPage || 0,
		limit: queryParams.pagination.resultsPerPage || 10
	});

	logs.map(value => {
		if (value.log.includes('$') && value.criminal_id !== null) {
			value.log = value.log.replace('$', value.criminal_id.name);
		} else if (value.log.includes('&') && value.user_id !== null) {
			value.log = value.log.replace('&', value.user_id.name);
		} else if (value.log.includes('/') && value.police_station_id !== null) {
			value.log = value.log.replace('/', value.police_station_id.name);
		} else {
			return;
		}
		return value;
	});

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Logs fetched from DB', result: { logs, total: logsCount } });
}
