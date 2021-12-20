import { logger } from '$api/tools';
import config from 'config';
import { createTransport } from 'nodemailer';

type MailConfig = {
	host: string;
	port: number;
	email: string;
	password: string;
	enable: boolean;
};

const mailConfig: MailConfig = config.get('mailer');

export const mailService = createTransport({
	host: mailConfig.host,
	port: mailConfig.port,
	auth: {
		user: mailConfig.email,
		pass: mailConfig.password
	},
	tls: {
		rejectUnauthorized: false
	}
});

export const sendEmail = (to: string, subject: string, text: string) => {
	if (!mailConfig.enable) {
		logger.info(`Suppressed email to ${to}: ${text}`);
		return;
	}

	return mailService.sendMail({
		from: '"Kaiyeadu" <no-reply@kaiyeadu.com',
		to,
		subject,
		text
	});
};
