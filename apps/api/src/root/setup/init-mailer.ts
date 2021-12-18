import config from 'config';
import pc from 'picocolors';
import { logger } from '$api/tools';
import { mailService } from '../connections/mail.connection';

export async function verifyMailConnection() {
	try {
		const allowEmails = config.get('mailer.enable') ?? process.env.NODE_ENV === 'production';
		if (!allowEmails) {
			logger.info('Skipping email connection verification.');
			return;
		}
		await mailService.verify();
		logger.info(`Connection to mail server ${pc.green('successful')}`);
	} catch (exp) {
		logger.info(`Connection to mail server ${pc.red('failed')}`);
		throw exp;
	}
}
