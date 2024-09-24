import express from 'express';
import { getBooks, createBook, getAllBooks, updateBookStatus } from '../controller/book.controller';
import { verifyToken, validateUpdateBookStatus } from '../middlewares';
const router = express.Router();

router.post('/create', verifyToken, createBook);
router.get('/bookings', verifyToken, getBooks);
router.get('/all-bookings', verifyToken, getAllBooks);
router.put('/update-status', verifyToken, updateBookStatus);

export default router;