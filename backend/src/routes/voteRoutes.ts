import { Router } from 'express';
import { protectAdmin, protectUser } from '../middlewares/authMiddleware.js';
import {
  castVote,
  getResults,
  getDashboardStats,
} from '../controllers/voteController.js';

const router = Router();

router.post('/', protectUser, castVote);
router.get('/results', protectAdmin, getResults);
router.get('/stats', protectAdmin, getDashboardStats);

export default router;
