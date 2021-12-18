import { Router } from 'express';
import * as caseService from './case.service';

const router = Router();

router.get('/all/:criminal_id', caseService.getAll);
router.get('/:criminal_id', caseService.getInactiveCases);

export { router as caseRouter };
