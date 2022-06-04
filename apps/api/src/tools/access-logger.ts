import { AccessLog } from '$api/modules/models';
import { ApiRequest } from '$api/types';

export const accessLogger = async (
	req: ApiRequest,
	message: string,
	criminalId?: string,
	policeStationId?: string
) => {
	const { id: userId } = req.user;

	if (!criminalId) {
		criminalId = null;
	}
	if (!policeStationId) {
		policeStationId = null;
	}
	if (!criminalId && !policeStationId) {
		criminalId = null;
		policeStationId = null;
	}

	const logDetails = {
		userId,
		criminalId,
		policeStationId,
		log: message
	};

	const log = AccessLog.build(logDetails);

	await log.save();
};
