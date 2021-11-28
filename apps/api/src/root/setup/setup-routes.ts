import 'express-async-errors';
import { Express } from 'express';
import { authRouter } from '$api/modules/routers';
import { errorHandler } from '$api/tools';

export function setup_routes(app: Express) {
	app.use('/auth', authRouter);

	app.use(errorHandler);
}
