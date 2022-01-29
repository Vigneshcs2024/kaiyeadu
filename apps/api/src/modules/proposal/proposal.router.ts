import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as proposalService from './proposal.service';

const router = Router();

router.get('/list', proposalService.list);
router.get('/:id', proposalService.getById);
router.put('/update/:id', adminsOnly, proposalService.updateStatus);
router.delete('/remove/:id', adminsOnly, proposalService.remove);

router.post('/create', proposalService.add);

export { router as proposalRouter };
