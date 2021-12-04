import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '$api/errors';
import { ApiRequest } from '$api/types';

export function authenticatedUsersOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user) return next();

	throw new ClientError('You need to be logged in to perform this action', StatusCodes.FORBIDDEN);
}
