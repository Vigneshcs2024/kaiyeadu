import { Express } from 'express';
import { pingRouter } from '../../modules/ping/ping.router';

export function setup_routes(app: Express) {
	app.use('/ping', pingRouter);
}
