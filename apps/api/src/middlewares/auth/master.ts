import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '../../errors/client.error';
import { ApiRequest } from '../../types/ApiRequest.type';

export default function mastersOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user.role === 'master') next();

	throw new ClientError(
		'You must be a super user to perform this operation',
		StatusCodes.FORBIDDEN
	);
}
