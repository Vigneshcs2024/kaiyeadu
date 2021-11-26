/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { SampleType } from '@kaiyeadu/api-interfaces';

const app = express();

const sample: SampleType = { a: 'b' };

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 5000;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
	console.log(`Shared Type variable: ${JSON.stringify(sample)}`);
});
server.on('error', console.error);
