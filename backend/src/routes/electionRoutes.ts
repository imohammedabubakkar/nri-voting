import { Router } from 'express';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import {
  getSchedule,
  setSchedule,
  updateScheduleStatus,
  deleteSchedule,
} from '../controllers/electionController.js';

const router = Router();

router.get('/schedule', getSchedule);
router.use(protectAdmin);
router.post('/schedule', setSchedule);
router.patch('/schedule/status', updateScheduleStatus);
router.delete('/schedule', deleteSchedule);

export default router;
