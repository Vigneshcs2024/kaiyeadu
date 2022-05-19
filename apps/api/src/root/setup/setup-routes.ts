import 'express-async-errors';
import express, { Express } from 'express';
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
	moRouter,
	occupationRouter,
	operationalPlacesRouter,
	policeStationRouter,
	proposalRouter,
	uploadRouter,
	userRouter,
	vehicleRouter
} from '$api/modules/routers';
import path from 'path';

export function setup_routes(app: Express) {
	app.use('/active-cases', parseAuthToken, activeCaseRouter);
	app.use('/address', parseAuthToken, addressRouter);
	app.use('/associate', parseAuthToken, associateRouter);
	app.use('/auth', authRouter);
	app.use('/bond', parseAuthToken, bondRouter);
	app.use('/cases', parseAuthToken, caseRouter);
	app.use('/criminal', parseAuthToken, criminalRouter);
	app.use('/family-member', parseAuthToken, familyMemberRouter);
	app.use('/last-arrest', parseAuthToken, lastArrestRouter);
	app.use('/link', parseAuthToken, linkRouter);
	app.use('/modus-operandi', parseAuthToken, moRouter);
	app.use('/occupation', parseAuthToken, occupationRouter);
	app.use('/operational-place', parseAuthToken, operationalPlacesRouter);
	app.use('/police-station', parseAuthToken, policeStationRouter);
	app.use('/proposal', parseAuthToken, proposalRouter);
	app.use('/upload', parseAuthToken, adminsOnly, uploadRouter);
	app.use('/user', parseAuthToken, userRouter);
	app.use('/vehicle', parseAuthToken, vehicleRouter);
	app.use('/common', commonRouter);

	app.use('/static/image', express.static(path.join(__dirname, 'src/upload/images')));
	app.use(errorHandler);
}
