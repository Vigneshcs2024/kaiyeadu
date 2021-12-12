import pc from 'picocolors';
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
	PoliceStation,
	User
} from '$api/modules/models';

export async function initDb() {
	await db.authenticate();
	await PoliceStation.sync({ alter: true });
	await User.sync({ alter: true });
	await Criminal.sync({ alter: true });
	await Case.sync({ alter: true });
	await ActiveCase.sync({ alter: true });
	await Address.sync({ alter: true });
	await Occupation.sync({ alter: true });
	await FamilyMember.sync({ alter: true });
	await LastArrest.sync({ alter: true });
	await Link.sync({ alter: true });
	await ModusOperandi.sync({ alter: true });
	logger.info(`DB connection established & synced ${pc.green('successfully')}`);
}
