import { Response, Request, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { UniqueConstraintError } from 'sequelize';
import { ClientError } from '$api/errors';
import { logger } from './logger';

export const errorHandler = (
	err: (ClientError & ValidationError) & Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ValidationError || err.isJoi) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message: err.details[0].message });
	}

	if (err instanceof UniqueConstraintError) {
		return res.status(StatusCodes.CONFLICT).json({
			message: 'The particular record already exists'
		});
	}

	if (err.status) {
		return res.status(err.status).json({ message: err.message });
	}

	logger.error(err.stack);
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: 'Internal server error'
	});
	next();
};
