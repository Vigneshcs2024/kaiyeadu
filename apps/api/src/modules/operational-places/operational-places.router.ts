import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as opService from './operational-places.service';

const router = Router();

router.patch('/update/:id', adminsOnly, opService.update);

export { router as operationalPlacesRouter };
