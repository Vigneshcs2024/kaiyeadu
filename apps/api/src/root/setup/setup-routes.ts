import 'express-async-errors';
import { Express } from 'express';
import { authRouter, userRouter } from '$api/modules/routers';
import { errorHandler } from '$api/tools';
import { parseAuthToken } from '$api/middlewares/auth';

export function setup_routes(app: Express) {
	app.use('/auth', authRouter);
	app.use('/user', parseAuthToken, userRouter);

	app.use(errorHandler);
}
