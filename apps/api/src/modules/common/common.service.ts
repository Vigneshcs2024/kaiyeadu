import { accessLogger } from '$api/tools/access-logger';
import { ApiRequest } from '$api/types';
import { Response } from 'express';
import { Case, Criminal, PoliceStation, Proposal, User } from '../models';

export async function getStats(req: ApiRequest, res: Response) {
	const noOfUsers = await User.count({ where: { role: 'user' } });
	const noOfAdmins = await User.count({ where: { role: 'admin' } });
	const noOfMasters = await User.count({ where: { role: 'master' } });
	const noOfStations = await PoliceStation.count();
	const noOfCases = await Case.count();
	const noOfCriminals = await Criminal.count();
	const noOfProposalReqs = await Proposal.count({ where: { status: 'pending' } });

	accessLogger(req, ` Stats fetched by &`);

	res.json({
		message: 'Statistics fetched successfully',
		result: {
			users: noOfUsers,
			admins: noOfAdmins,
			super_users: noOfMasters,
			stations: noOfStations,
			cases: noOfCases,
			criminals: noOfCriminals,
			proposals: noOfProposalReqs
		}
	});
}

export function ping(req: ApiRequest, res: Response) {
	res.json({
		message: 'Pong!',
		result: 'Server is up and running'
	});
}
