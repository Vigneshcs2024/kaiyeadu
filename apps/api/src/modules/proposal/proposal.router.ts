import { Router } from 'express';
import * as proposalService from './proposal.service';

const router = Router();

router.get('/', proposalService.list);

router.get('/:id', proposalService.getById);

router.put('/update/:id', proposalService.updateStatus);

router.post('/create', proposalService.add);

export { router as proposalRouter };
