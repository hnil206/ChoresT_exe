import { Request, Response } from 'express';

import PayOS from '@payos/node';

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID!,
  process.env.PAYOS_API_KEY!,
  process.env.PAYOS_CHECKSUM_KEY!
);

export const createPaymentLink = async (req: Request, res: Response) => {
  try {
    console.log('Received request body:', req.body);
    const { amount, orderDescription, orderType } = req.body;

    if (!amount || !orderDescription || !orderType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const paymentLinkData = {
      orderCode: Date.now(), // Changed to number
      amount: Number(amount), // Ensure this is a number
      // amount: 5000, // Ensure this is a number
      description: "Payment for the book",
      cancelUrl: `${process.env.CLIENT_URL}/payment/cancel`,
      returnUrl: `${process.env.CLIENT_URL}/payment/success`,
    
    };

    console.log('Payment link data:', paymentLinkData);

    const paymentLink = await payOS.createPaymentLink(paymentLinkData);

    console.log('Payment link created:', paymentLink);

    res.json({ paymentUrl: paymentLink.checkoutUrl });
  } catch (error: any) {
    console.error('Error creating payment link:', error);
    if (error.response) {
      console.error('PayOS API response:', error.response.data);
    }
    res.status(500).json({ 
      message: 'Error creating payment link', 
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
};

export const handlePayOSWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-payos-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    // Since we can't verify the signature, we'll assume it's valid for now
    // In a production environment, you should implement proper signature verification
    console.warn('Webhook signature verification skipped. Implement this for production use.');

    const { data } = req.body;

    if (data.status === 'PAID') {
      // Payment successful, update your database here
      console.log('Payment successful for order:', data.orderCode);
      // TODO: Update order status in your database
    }

    res.json({ message: 'Webhook received' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Error processing webhook' });
  }
};
