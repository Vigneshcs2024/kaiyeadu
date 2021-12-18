import config from 'config';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { rateLimiter, requestLogger } from '$api/middlewares';

export function setup_middlewares(app: Express) {
	app.disable('x-powered-by');
	app.use(rateLimiter);
	app.use(express.json());
	app.use(cors());

	if (config.get('logging.requests')) app.use(requestLogger);

	app.use(helmet());
}
