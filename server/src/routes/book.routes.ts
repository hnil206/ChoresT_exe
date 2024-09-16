import express from 'express';
import {createBook, getBooks} from '../controller/book.controller';

const router = express.Router();


router.post('/create', createBook);

router.get('/bookings', getBooks);

export default router;
