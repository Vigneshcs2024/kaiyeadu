import express from 'express';
import * as authService from './auth.service';

const router = express.Router();

router.put('/user/get-login-password', authService.getLoginPassword);
router.post('/user/login', authService.loginWithGPF);

router.post('/admin/login', authService.login);
router.patch('/admin/reset-password', authService.resetPassword);

export { router as authRouter };
