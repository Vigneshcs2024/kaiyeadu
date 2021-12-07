import { NextFunction, Response } from 'express';
import { AuthorizationError } from '$api/errors';
import { ApiRequest } from '$api/types';

export function authenticatedUsersOnly(req: ApiRequest, _res: Response, next: NextFunction) {
	if (req.user) return next();

	throw new AuthorizationError('You need to be logged in to perform this action');
}
