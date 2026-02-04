import { Router } from 'express';
import { getAdminDashboardStats } from './dashboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Admin Dashboard Stats
router.get('/stats', authMiddleware, getAdminDashboardStats);

export default router;