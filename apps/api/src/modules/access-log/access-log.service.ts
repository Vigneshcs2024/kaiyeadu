import { Response } from 'express';
import { ApiRequest } from '$api/types';
import { StatusCodes } from 'http-status-codes';

export async function listLogs(req: ApiRequest, res: Response) {
	console.log(req);

	return res.status(StatusCodes.OK).json({ message: 'Logs fetched from DB', result: 'logs' });
}
