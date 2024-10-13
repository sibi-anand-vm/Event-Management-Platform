import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
} from '../Controllers/userController.js';
import { protect, admin } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getUsers);

export default router;
