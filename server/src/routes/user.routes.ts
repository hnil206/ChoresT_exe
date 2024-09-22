import express from 'express';
import { signup, login, logout} from '../controller/user.controller';

const router = express.Router();

// POST /auth/signup
router.post('/signup', signup);

// POST /auth/login
router.post('/login', login);
router.post('/logout', logout);
export default router;
