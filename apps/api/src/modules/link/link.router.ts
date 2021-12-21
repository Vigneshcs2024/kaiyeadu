import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as linkService from './link.service';

const router = Router();

router.patch('/update/:id', adminsOnly, linkService.update);

export { router as linkRouter };
