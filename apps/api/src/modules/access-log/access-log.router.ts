import express from 'express';
import { adminsOnly, parseAuthToken } from '$api/middlewares/auth';
import * as accessLogService from './access-log.service';

const router = express.Router();

router.get('/list', parseAuthToken, adminsOnly, accessLogService.listLogs);
