import { NextFunction, Response } from 'express';
import { ClientError } from '../../errors/client.error';
import { ApiRequest } from '../../types/ApiRequest.type';

export default function authenticatedUsersOnly(
	req: ApiRequest,
	_res: Response,
	next: NextFunction
) {
	if (req.user) next();

	throw new ClientError('You need to be logged in to perform this action');
}
