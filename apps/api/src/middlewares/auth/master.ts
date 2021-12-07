import { NextFunction, Response } from 'express';
import { AuthorizationError } from '$api/errors';
import { ApiRequest } from '$api/types';

export function mastersOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user?.role === 'master') return next();

	throw new AuthorizationError('You must be a super user to perform this operation');
}
