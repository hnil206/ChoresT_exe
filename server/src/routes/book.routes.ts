import express from 'express';
import { getBooks, createBook, updateBookStatus, getMyBookings} from '../controller/book.controller';
import { verifyToken } from '../middlewares';
const router = express.Router();

router.post('/create', verifyToken, createBook);
router.get('/bookings', verifyToken, getBooks);
//router.get('/all-bookings', verifyToken, getAllBooks);
router.put('/update-status', verifyToken, updateBookStatus);
router.get('/my-bookings', verifyToken, getMyBookings);
export default router;