import express from 'express';
import { createPaymentLink, handlePayOSWebhook } from '../controller/payosController';

const router = express.Router();

router.post('/create_payment_link', createPaymentLink);
router.post('/payos_webhook', handlePayOSWebhook);

export default router;
