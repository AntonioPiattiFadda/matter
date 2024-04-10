import axios from 'axios';
import { Button } from './ui/button';
// import { updateInvoice } from '@/Services';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const SERVER_LINK = import.meta.env.VITE_STRIPE_SERVER_LINK;

interface StripePayProps {
  stripeId: string;
  invoiceTotal: number;
  invoiceId: string;
  userId: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY || '', {
  locale: 'en',
});

const StripePay = ({
  stripeId,
  invoiceTotal,
  invoiceId,
  userId,
}: StripePayProps) => {
  const [clientSecret, setClientSecret] = useState('');
  console.log(SERVER_LINK);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  // const options = {
  //   clientSecret,
  //   appearance: {
  //     theme: 'stripe',
  //   },
  // };

  const handleStripePay = () => {
    axios
      .post(
        `${SERVER_LINK}/create-payment-intent`,
        { stripeId, invoiceTotal },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const clientSecret = res.data.clientSecret;

        setClientSecret(clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button
        className="text-base m-3 w-11/12 mb-5 sm:w-36 sm:text-sm"
        onClick={handleStripePay}
      >
        <img
          className="h-7 mr-2"
          src="../../public/WalletLogo.png"
          alt="wallet icon"
        />
        Pay with Stripe
      </Button>

      {clientSecret && (
        <div
          className="absolute bg-slate-100 p-4 rounded-sm bottom-20 border shadow-xl"
          style={{
            position: 'absolute',
            bottom: '50%',
            left: '50%',
            transform: 'translate(-50%, +40%)',
          }}
        >
          <Elements
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
              },
            }}
            stripe={stripePromise}
          >
            <CheckoutForm
              clientSecret={clientSecret}
              invoiceId={invoiceId}
              userId={userId}
            />
          </Elements>
        </div>
      )}
    </>
  );
};

export default StripePay;
