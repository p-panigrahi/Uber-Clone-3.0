import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckOutFrom = ({ amount }) => {
  const stripe = useStripe(); // Use useStripe hook to get the Stripe instance
  const elements = useElements();

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (elements == null || stripe == null) {
      return;
    }

    try {
      // Call elements.submit() synchronously
      const { error: submitError } = await elements.submit();

      if (submitError) {
        throw new Error(submitError.message);
      }

      const res = await fetch('/api/create-intent', {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          description: 'Payment for goods', // Add a description for the payment intent
        })
      });

      if (!res.ok) {
        throw new Error('Failed to create intent');
      }

      const secretKey = await res.json();
      console.log(secretKey);

      // Use the instance of Stripe to call confirmPayment
      const { error } = await stripe.confirmPayment({
        clientSecret: secretKey,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/"
        }
      });

      if (error) {
        throw new Error(error.message);
      }

    } catch (error) {
      console.error('Payment submission error:', error.message);
      // Handle error appropriately
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-6'>
      <h2 className='text-[20px] font-bold my-5'>Amount To Pay {amount}</h2>
      <form onSubmit={handelSubmit} className='max-w-md'>
        <PaymentElement />
        <button className='w-full bg-black text-white p-2 rounded-lg mt-3'>Pay</button>
      </form>
    </div>
  );
}

export default CheckOutFrom;
