import express from 'express';
import * as pingService from './ping.service';

const router = express.Router();

router.get('/', pingService.ping);

export { router as pingRouter };
