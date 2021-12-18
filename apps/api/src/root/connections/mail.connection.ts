import config from 'config';
import { createTransport } from 'nodemailer';

export const mailService = createTransport({
	host: 'smtp.mailgun.org',
	port: 587,
	auth: {
		user: config.get('mailer.email') ?? process.env.MAIL_ID,
		pass: config.get('mailer.password') ?? process.env.MAIL_PASS
	},
	tls: {
		rejectUnauthorized: false
	}
});
