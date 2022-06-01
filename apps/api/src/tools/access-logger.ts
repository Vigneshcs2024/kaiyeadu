import { AccessLog } from '$api/modules/models';
import { getUser } from '$api/modules/user/user.repository';
import { ApiRequest } from '$api/types';

export const accessLogger = async (req: ApiRequest, message: string) => {
	const { id: userId } = req.user;

	const { name } = await getUser(userId);

	const logDetails = {
		userId,
		name,
		log: message
	};

	const log = AccessLog.build(logDetails);

	await log.save();
};
