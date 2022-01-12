import pc from 'picocolors';
import config from 'config';
import { db } from '$api/root/connections';
import { logger } from '$api/tools';
import {
	ActiveCase,
	Address,
	Case,
	Criminal,
	FamilyMember,
	LastArrest,
	Link,
	ModusOperandi,
	Occupation,
	OperationalPlace,
	PoliceStation,
	Proposal,
	User,
	Vehicle,
	Associate,
	Bond
} from '$api/modules/models';

export async function initDb() {
	await db.authenticate();

	logger.info(`Database connection established ${pc.green('successfully')}`);

	if (!config.get('db.sync')) {
		logger.info('Skipping database schema synchronization.');
		return;
	}

	await PoliceStation.sync({ alter: true });
	await User.sync({ alter: true });
	await Criminal.sync({ alter: true });
	await Associate.sync({ alter: true });
	await Bond.sync({ alter: true });
	await Case.sync({ alter: true });
	await ActiveCase.sync({ alter: true });
	await Address.sync({ alter: true });
	await Occupation.sync({ alter: true });
	await FamilyMember.sync({ alter: true });
	await LastArrest.sync({ alter: true });
	await Link.sync({ alter: true });
	await ModusOperandi.sync({ alter: true });
	await OperationalPlace.sync({ alter: true });
	await Proposal.sync({ alter: true });
	await Vehicle.sync({ alter: true });

	logger.info(`Database synced ${pc.green('successfully')}`);
}
