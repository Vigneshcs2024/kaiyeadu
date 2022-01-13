import config from 'config';
import twilio from 'twilio';
import pc from 'picocolors';
import { logger } from '$api/tools';

type TwilioConfig = {
	sid: string;
	authToken: string;
	enable: boolean;
	phone: string;
};

const twilioConfig: TwilioConfig = config.get('twilio');

export const twilioClient = twilio(twilioConfig.sid, twilioConfig.authToken, {
	lazyLoading: true
});

export const sendSms = (to: string, messageBody: string) => {
	if (!twilioConfig.enable) {
		logger.info(`Suppressed message to ${pc.underline(to)}: "${messageBody}"`);
		return;
	}

	logger.debug(`Sending text message to ${to}`);
	return twilioClient.messages.create({
		to,
		from: twilioConfig.phone,
		body: messageBody
	});
};
