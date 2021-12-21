import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as occupationService from './occupation.service';

const router = Router();

router.patch('/update/:id', adminsOnly, occupationService.update);

export { router as occupationRouter };
