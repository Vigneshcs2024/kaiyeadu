import config from 'config';
import { Express } from 'express';
import helmet from 'helmet';
import { rateLimiter, requestLogger } from '../middlewares';

export function setup(app: Express) {
	app.disable('x-powered-by');
	app.use(rateLimiter);

	if (config.get('api.logging.requests')) app.use(requestLogger);

	app.use(helmet());
}
