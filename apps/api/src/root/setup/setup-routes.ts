import 'express-async-errors';
import { Express } from 'express';
import { adminsOnly, parseAuthToken } from '$api/middlewares/auth';
import { errorHandler } from '$api/tools';
import { authRouter, criminalRouter, policeStationRouter, userRouter } from '$api/modules/routers';

export function setup_routes(app: Express) {
	app.use('/auth', authRouter);
	app.use('/user', parseAuthToken, userRouter);
	app.use('/police-station', parseAuthToken, adminsOnly, policeStationRouter);
	app.use('/criminal', parseAuthToken, criminalRouter);

	app.use(errorHandler);
}
