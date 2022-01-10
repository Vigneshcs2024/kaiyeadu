import config from 'config';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { rateLimiter, requestLogger } from '$api/middlewares';

export function setup_middlewares(app: Express) {
	app.disable('x-powered-by');
	app.use(express.json());
	app.use(
		cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
			exposedHeaders: ['Content-Type', 'Authorization', 'Accept']
		})
	);

	if (config.util.getEnv('NODE_ENV') === 'production') app.use(rateLimiter);

	if (config.get('logging.requests')) app.use(requestLogger);

	app.use(helmet());
}
