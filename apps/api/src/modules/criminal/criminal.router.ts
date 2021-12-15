import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as criminalService from './criminal.service';

const router = Router();

router.post('/create', adminsOnly, criminalService.create);

export { router as criminalRouter };
