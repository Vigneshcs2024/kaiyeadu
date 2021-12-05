import express from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as userService from './user.service';

const router = express.Router();

router.post('/create', adminsOnly, userService.createUser);
router.get('/list', adminsOnly, userService.listUsers);
router.get('/:id', adminsOnly, userService.getUser);
router.patch('/:id', adminsOnly, userService.updateUser);

router.patch('/update-password', adminsOnly, userService.updatePassword);

export { router as userRouter };
