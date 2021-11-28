import express from 'express';
import * as authService from './auth.service';

const router = express.Router();

router.get('/login', authService.login);

export { router as authRouter };
