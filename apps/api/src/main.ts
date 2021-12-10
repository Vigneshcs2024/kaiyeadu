import dotenv from 'dotenv-safe';
dotenv.config({ allowEmptyValues: true });

import config from 'config';
import express from 'express';
import pc from 'picocolors';
import { logger } from './tools';
import { db } from './root/connections';
import { setup_middlewares, setup_routes } from './root/setup';
import { initDb } from './root/setup/init-db';

const app = express();

setup_middlewares(app);
setup_routes(app);

const host = config.get<string>('api.host') ?? process.env.HOST ?? '127.0.0.1';
const port = config.get<number>('api.port') ?? +process.env.PORT ?? 5000;
const server = app.listen(port, host, async () => {
	logger.info(`Listening at ${pc.cyan(`http://${host}:${port}`)}`);

	try {
		await initDb();
	} catch (e) {
		console.error(e);
		logger.error(e.stack);
	}
});

process.on('SIGINT', () => {
	db.close();
	process.exit(0);
});

server.on('error', err => {
	logger.error(err);
});
