import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';
import { ApiRequest } from '$api/types';
import { AuthenticationError } from '$api/errors';

export async function parseAuthToken(req: ApiRequest, _res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AuthenticationError('Authorization header not set');
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		throw new AuthenticationError('Empty authorization header');
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded: PayloadObject) => {
		if (err) {
			throw new AuthenticationError(err.message);
		}

		req.user = decoded;
		next();
	});
}
