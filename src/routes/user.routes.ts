import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/user.controller';

const router = Router();

// Routes disponibles
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;
