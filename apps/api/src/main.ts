/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import pc from 'picocolors';
import { SampleType } from '@kaiyeadu/api-interfaces';
import { setup, logger } from './root';

dotenv.config();
const app = express();

setup(app);

const sample: SampleType = { a: 'b' };

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || config.get('api.port');
const server = app.listen(port, () => {
	logger.info(`Listening at ${pc.cyan(`http://localhost:${port}/api`)}`);
	logger.debug(`Shared Type variable: ${JSON.stringify(sample)}`);
});
server.on('error', logger.error);
