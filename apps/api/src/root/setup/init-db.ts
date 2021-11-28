import pc from 'picocolors';
import { db } from '../connections';
import { logger } from '../../tools';

import { User } from '../../modules/user/user.model';
import { PoliceStation } from '../../modules/police-station/police-station.model';

export async function initDb() {
	await db.authenticate();
	await PoliceStation.sync({ alter: true });
	await User.sync({ alter: true });
	logger.info(`DB connection established & synced ${pc.green('successfully')}`);
}
