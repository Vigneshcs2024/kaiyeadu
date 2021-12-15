import { Router } from 'express';
import * as caseService from './case.service';

const router = Router();

router.get('/:criminal_id', caseService.getAll);

export { router as caseRouter };
