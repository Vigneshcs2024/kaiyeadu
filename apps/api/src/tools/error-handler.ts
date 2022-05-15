import { Response, Request, NextFunction } from 'express';
import { ValidationError } from 'joi';
import pc from 'picocolors';
import { StatusCodes } from 'http-status-codes';
import { ForeignKeyConstraintError, UniqueConstraintError } from 'sequelize';
import { AuthenticationError, AuthorizationError, ClientError } from '$api/errors';
import { jsonPrettyPrint } from '$api/utilities';
import { logger } from './logger';

export const errorHandler = (
	err: (ClientError & ValidationError) & Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		err instanceof ValidationError ||
		err instanceof ForeignKeyConstraintError ||
		err instanceof UniqueConstraintError ||
		err instanceof ClientError
	) {
		logger.debug(
			pc.yellow('Handled error: ') +
				jsonPrettyPrint({
					error: {
						name: err.name,
						message: err.message,
						details: err.details,
						stack: err.stack
					}
				})
		);
	}

	if (err instanceof ValidationError || err.isJoi) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message: err.details[0].message });
	}

	if (err instanceof UniqueConstraintError) {
		const field = Object.keys(err.fields)[0];
		return res.status(StatusCodes.CONFLICT).json({
			message: `The specified ${field} is already in use`
		});
	}

	if (err instanceof ForeignKeyConstraintError) {
		const field = err.fields[0];
		return res.status(StatusCodes.CONFLICT).json({
			message: `The specified ${field} is linked with multiple criminals and accounts`
		});
	}

	if (err instanceof AuthenticationError || err instanceof AuthorizationError) {
		return res.status(err.status).json({ message: `${err.name}: ${err.message}` });
	}

	if (err instanceof ClientError) {
		return res.status(err.status).json({ message: err.message });
	}

	if ((err as Error) instanceof SyntaxError) {
		return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Malformed request body' });
	}

	console.error(err);
	logger.error((err as Error).stack);
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: 'Internal server error'
	});
	next();
};
