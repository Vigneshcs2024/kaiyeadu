import dotenv from 'dotenv';
dotenv.config();

import config from 'config';
import express from 'express';
import pc from 'picocolors';
import { setup, logger, db } from './root';

const app = express();

setup(app);

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || config.get('api.port');
const server = app.listen(port, async () => {
	logger.info(`Listening at ${pc.cyan(`http://localhost:${port}/api`)}`);

	try {
		await db.authenticate();
		logger.info(`DB connection established ${pc.green('successfully')}`);
	} catch (e) {
		logger.error(e.stack);
	}
});

process.on('SIGINT', () => {
	db.close();
});

server.on('error', err => {
	db.close();
	logger.error(err);
});
