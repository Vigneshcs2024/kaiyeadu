import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../tools/logger';

/**
 * Handles the error response
 */
export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: 'Something went wrong from our side. Please try again after some time.',
		error:
			config.util.getEnv('NODE_ENV') === 'production'
				? undefined
				: { message: err.message, stack: err.stack }
	});

	logger.error(err.stack);
	next();
};
