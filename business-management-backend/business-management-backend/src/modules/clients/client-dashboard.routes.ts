import { Router } from 'express';
import { getClientDashboardStats } from './client-dashboard.controller';
import { clientAuthMiddleware } from '../../middlewares/client-auth.middleware';

const router = Router();

// Client Dashboard Stats
router.get('/stats', clientAuthMiddleware, getClientDashboardStats);

export default router;