import express from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as userService from './user.service';

const router = express.Router();

router.post('/create', adminsOnly, userService.createUser);
router.get('/list', adminsOnly, userService.listUsers);

export { router as userRouter };
