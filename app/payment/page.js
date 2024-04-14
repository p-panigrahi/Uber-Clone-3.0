"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React from "react";
import CheckOutFrom from '/components/home/CheckOutFrom'
// const Payment = () => {
//   const searchParam = useSearchParams();
//   const amount = searchParam.get('amount');
//   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);
//   const options = {
//     mode:'payment',
//     amount:Math.round(amount*100),
//     currency : 'usd'
//   }
//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckOutFrom amount={amount}/>
//     </Elements>
//   );
// };

// export default Payment;
const Payment = () => {
  const searchParam = useSearchParams();
  const amount = searchParam.get('amount');
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

  // Define payment intent options including the description
  const options = {
    mode: 'payment',
    amount: Math.round(amount * 100),
    currency: 'usd', // Add a description for the payment intent
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutFrom amount={amount} />
    </Elements>
  );
};

export default Payment;
