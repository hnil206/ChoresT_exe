import express from 'express';
import {getBooks, createBook} from '../controller/book.controller';
import {verifyHousemaid} from '../middlewares/verifyHousemaid';
import {verifyUser} from '../middlewares/verifyUser';
import { verifyToken } from '../middlewares';
const router = express.Router();


router.post('/create', verifyToken,createBook);

router.get('/bookings', verifyToken,getBooks);

export default router;
