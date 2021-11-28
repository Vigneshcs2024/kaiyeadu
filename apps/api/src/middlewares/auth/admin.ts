import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '$api/errors';
import { ApiRequest } from '../../types/ApiRequest.type';

export default function adminsOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user.role === 'admin') next();

	throw new ClientError('You must be an admin to perform this operation', StatusCodes.FORBIDDEN);
}
