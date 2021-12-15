import { Router } from 'express';
import * as activeCaseService from './active-case.service';

const router = Router();

router.get('/:criminal_id', activeCaseService.getAll);

export { router as activeCaseRouter };
