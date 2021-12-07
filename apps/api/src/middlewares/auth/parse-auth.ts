import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { ClientError } from '$api/errors';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';

export async function parseAuthToken(req: ApiRequest, _res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new ClientError('Authorization header not set', StatusCodes.UNAUTHORIZED);
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		throw new ClientError('Empty authorization header', StatusCodes.UNAUTHORIZED);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded: PayloadObject) => {
		if (err) {
			throw new ClientError('Invalid token', StatusCodes.UNAUTHORIZED);
		}

		req.user = decoded;
	});

	next();
}
