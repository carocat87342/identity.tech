import { Router } from 'express';
import {acceptInvitation, forgotPassword, resetPassword} from '../controller/user.controller';

const router = Router();

router.get('/forgot-password', forgotPassword);
router.get('/reset-password', resetPassword);
router.get('/accept-invitation', acceptInvitation);

export default router;
