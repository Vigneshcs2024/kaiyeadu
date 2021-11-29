import { adminsOnly } from '$api/middlewares/auth';
import express from 'express';
import * as authService from './user.service';

const router = express.Router();

router.post('/create', adminsOnly, authService.createUser);

export { router as userRouter };
