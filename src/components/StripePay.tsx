import axios from 'axios';
import { Button } from './ui/button';
// import { updateInvoice } from '@/Services';
import PopUpMetamask from './PopUpMetamask';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

interface StripePayProps {
  stripeId: string;
  invoiceTotal: number;
  invoiceId: string;
  userId: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY || '');

const StripePay = ({
  stripeId,
  invoiceTotal,
  invoiceId,
  userId,
}: StripePayProps) => {

  const [showPopUp, setShowPopUp] = useState({
    status: false,
    message: '',
  });
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const user = window.sessionStorage.getItem('user');
  const parserUser = JSON.parse(user || '{}');

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleStripePay = () => {
    axios
      .post(
        'http://localhost:4242/create-payment-intent',
        { stripeId, invoiceTotal }, // Pasa los datos directamente como objeto
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const clientSecret = res.data.clientSecret;

        setClientSecret(clientSecret);
        // Maneja la respuesta del servidor según tus necesidades
        //   setTransactionId();
        //   updateInvoice(parserUser.id, invoiceId, {
        //     status: 'paid',
        //     metamaskHash: transactionInfo.transactionHash.toString(),
        //     payDate: new Date(),
        //   });
        //   setShowPopUp({
        //     status: true,
        //     message: 'Transaction successful',
        //   });
      })
      .catch((err) => {
        console.log(err);
        // Maneja los errores aquí
      });
  };

  return (
    <>
      {showPopUp.status && (
        <PopUpMetamask
          message={showPopUp.message}
          transactionHash={transactionId}
        />
      )}{' '}
      <Button
        className="text-base m-2 w-11/12 mb-5 sm:w-36 sm:text-sm"
        onClick={handleStripePay}
      >
        <img
          className="h-7 mr-2"
          src="../../public/WalletLogo.png"
          alt="wallet icon"
        />
        Pay with Stripe
      </Button>
      <div className="absolute bg-slate-100 p-4 rounded-sm bottom-20 border">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              clientSecret={clientSecret}
              invoiceId={invoiceId}
              userId={userId}
            />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripePay;
