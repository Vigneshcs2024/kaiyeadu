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

	res.json({
		users: noOfUsers,
		admins: noOfAdmins,
		super_users: noOfMasters,
		stations: noOfStations,
		cases: noOfCases,
		criminals: noOfCriminals,
		proposals: noOfProposalReqs
	});
}
