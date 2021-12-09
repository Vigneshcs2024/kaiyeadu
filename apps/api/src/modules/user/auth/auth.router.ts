import express from 'express';
import * as authService from './auth.service';

const router = express.Router();

router.put('/get-login-password', authService.getLoginPassword);
router.post('/login', authService.login);
router.patch('/reset-password', authService.resetPassword);

export { router as authRouter };
