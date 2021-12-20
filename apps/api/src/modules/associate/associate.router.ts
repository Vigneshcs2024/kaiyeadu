import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as associateService from './associate.service';

const router = Router();

router.post('/update/:id', adminsOnly, associateService.update);

export { router as associateRouter };
