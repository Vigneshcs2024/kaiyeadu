import 'express-async-errors';
import { Express } from 'express';
import { authRouter } from '../../modules/routers';
import { errorHandler } from '../../tools/error-handler';

export function setup_routes(app: Express) {
	app.use('/auth', authRouter);

	app.use(errorHandler);
}
