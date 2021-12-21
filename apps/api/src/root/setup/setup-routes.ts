import 'express-async-errors';
import { Express } from 'express';
import { adminsOnly, parseAuthToken } from '$api/middlewares/auth';
import { errorHandler } from '$api/tools';
import {
	activeCaseRouter,
	addressRouter,
	associateRouter,
	authRouter,
	bondRouter,
	caseRouter,
	commonRouter,
	criminalRouter,
	familyMemberRouter,
	lastArrestRouter,
	linkRouter,
	policeStationRouter,
	userRouter
} from '$api/modules/routers';

export function setup_routes(app: Express) {
	app.use('/active-cases', parseAuthToken, activeCaseRouter);
	app.use('/address', parseAuthToken, addressRouter);
	app.use('/associate', parseAuthToken, associateRouter);
	app.use('/auth', authRouter);
	app.use('/bond', parseAuthToken, bondRouter);
	app.use('/cases', parseAuthToken, caseRouter);
	app.use('/common', parseAuthToken, commonRouter);
	app.use('/criminal', parseAuthToken, criminalRouter);
	app.use('/family-member', parseAuthToken, familyMemberRouter);
	app.use('/last-arrest', parseAuthToken, lastArrestRouter);
	app.use('/link', parseAuthToken, linkRouter);
	app.use('/police-station', parseAuthToken, adminsOnly, policeStationRouter);
	app.use('/user', parseAuthToken, userRouter);

	app.use(errorHandler);
}
