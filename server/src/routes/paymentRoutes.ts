import express from 'express';
import { createPaymentUrl, handleVNPayReturn } from '../controller/vnpayController';

const router = express.Router();

router.post('/create_payment_url', createPaymentUrl);
router.get('/vnpay_return', handleVNPayReturn);
export default router;