import dotenv from 'dotenv-safe';
dotenv.config({ allowEmptyValues: true });

import config from 'config';
import express from 'express';
import pc from 'picocolors';
import { logger } from './tools';
import { db, setup_middlewares } from './root';

const app = express();

setup_middlewares(app);

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to api!' });
});

const port = config.get('api.port') ?? process.env.PORT ?? 5000;
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
