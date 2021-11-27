import pc from 'picocolors';
import { db } from '../connections';
import { logger } from '../../tools';

import { User } from '../../modules/user/user.model';

export async function initDb() {
	await db.authenticate();
	await User.sync({ force: true });
	logger.info(`DB connection established & synced ${pc.green('successfully')}`);
}
