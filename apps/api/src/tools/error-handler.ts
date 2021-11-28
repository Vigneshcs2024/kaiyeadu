import { Response, Request, NextFunction } from 'express';
import { logger } from '.';
import { ClientError } from '../errors';

export const errorHandler = (
	err: ClientError & Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.status >= 500) {
		logger.error(err.stack);
		return res.status(err.status || 500).send('Internal server error');
	}

	if (err.status) {
		return res.status(err.status).send(err.message);
	}

	logger.error(err.stack);
	next();
};
