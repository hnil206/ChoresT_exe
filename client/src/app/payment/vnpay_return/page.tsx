'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentVerification = () => {
  const [status, setStatus] = useState('Processing...');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/vnpay_return`);
        if (response.data.success) {
          setStatus('Payment successful!');
        } else {
          setStatus('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('An error occurred while verifying the payment.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <Card className='max-w-sm'>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{status}</p>
        <Button onClick={() => router.push('/')}>Return to Home</Button>
      </CardContent>
    </Card>
  );
};

export default function VNPayReturn() {
  return (
    <div className='flex justify-center items-center h-screen m-0'>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentVerification />
      </Suspense>
    </div>
  );
}
