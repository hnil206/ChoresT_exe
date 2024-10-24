import express from 'express';
import { signup, login, logout, updateProfile, getProfile, getAllHousemaids, getAllUsers,} from '../controller/user.controller';
import { verifyToken } from '../middlewares';

const router = express.Router();

// POST /auth/signup
router.post('/signup', signup);

// POST /auth/login
router.post('/login', login);
router.post('/logout', logout);
router.get('/users', getAllUsers);
router.get('/housemaid', getAllHousemaids);
router.put('/user/update', verifyToken,updateProfile);
router.get('/user/profile', verifyToken, getProfile);
// router.get('/check-admin', verifyToken, checkAdminRole);

export default router;
