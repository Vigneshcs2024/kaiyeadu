import pc from 'picocolors';
import { db } from '$api/root/connections';
import { logger } from '$api/tools';
import { ActiveCase, Case, Criminal, PoliceStation, User } from '$api/modules/models';

export async function initDb() {
	await db.authenticate();
	await PoliceStation.sync({ alter: true });
	await User.sync({ alter: true });
	await Criminal.sync({ alter: true });
	await Case.sync({ alter: true });
	await ActiveCase.sync({ alter: true });
	logger.info(`DB connection established & synced ${pc.green('successfully')}`);
}
