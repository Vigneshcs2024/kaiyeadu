import config from 'config';
import express, { Express } from 'express';
import helmet from 'helmet';
import { rateLimiter, requestLogger } from '../../middlewares';

export function setup_middlewares(app: Express) {
	app.disable('x-powered-by');
	app.use(rateLimiter);
	app.use(express.json());

	if (config.get('api.logging.requests')) app.use(requestLogger);

	app.use(helmet());
}
