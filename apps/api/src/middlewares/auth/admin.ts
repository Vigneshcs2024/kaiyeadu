import { NextFunction, Response } from 'express';
import { AuthorizationError } from '$api/errors';
import { ApiRequest } from '$api/types';

export function adminsOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user?.role === 'admin' || req.user?.role === 'master') return next();
	throw new AuthorizationError('You must be an admin to perform this operation');
}
