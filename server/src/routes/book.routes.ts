import express from 'express';
import {getBooks, createBook} from '../controller/book.controller';
import {verifyHousemaid} from '../middlewares/verifyHousemaid';
import {verifyUser} from '../middlewares/verifyUser';
const router = express.Router();


router.post('/create', createBook);

router.get('/bookings', getBooks);

export default router;
