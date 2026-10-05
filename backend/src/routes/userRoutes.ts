import { Router } from 'express';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import {
  getUsers,
  checkDuplicate,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = Router();

router.use(protectAdmin);
router.get('/', getUsers);
router.get('/check-duplicate', checkDuplicate);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
