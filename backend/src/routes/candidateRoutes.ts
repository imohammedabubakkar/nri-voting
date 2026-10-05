import { Router } from 'express';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController.js';

const router = Router();

router.get('/', getCandidates);
router.use(protectAdmin);
router.post('/', createCandidate);
router.get('/:id', getCandidateById);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

export default router;
