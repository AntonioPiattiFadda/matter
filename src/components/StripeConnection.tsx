import { Connections } from '@/types';
import { Button } from './ui/button';
import { CardDescription } from './ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserById, updateUser } from '@/Services';

interface StripeConnectionProps {
  connections: Connections;
  setConnections?: React.Dispatch<
    React.SetStateAction<{
      userInfo: boolean;
      stripe: boolean;
      metamask: boolean;
    }>
  >;
  loading: boolean;
}

const StripeConnection = ({
  loading,
  connections,
  setConnections,
}: StripeConnectionProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const account_id = searchParams.get('account_id');
  const success = searchParams.get('success');
  const [stripeId, setStripeId] = useState('' as string);
  const [missingStripeInfo, setMissingStripeInfo] = useState(false as boolean);

  const user = window.sessionStorage.getItem('user');
  const parsedUser = JSON.parse(user as string);

  const connectStripeInApp = () => {
    updateUser(parsedUser.id, { stripeId: account_id });
    if (setConnections) {
      setConnections((prevConnections: Connections) => ({
        ...prevConnections,
        stripe: true,
      }));
    }
  };

  useEffect(() => {
    getUserById(parsedUser.id).then((user) => {
      if (user?.stripeId) {
        setStripeId(user.stripeId);
        if (setConnections) {
          setConnections((prevState) => ({ ...prevState, stripe: true }));
        }
      }
    });
  }, [parsedUser.id]);

  useEffect(() => {
    if (account_id) {
      axios
        .get(`http://localhost:4242/v1/accounts/${account_id}`)
        .then((res) => {
          if (res.data.account.charges_enabled) {
            connectStripeInApp();
            setStripeId(account_id);
          } else {
            setMissingStripeInfo(true);
          }
          console.log(res.data.account.charges_enabled);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [account_id, success, setConnections]);

  const handleStripeConnection = () => {
    const stripeFetch = axios.post('http://localhost:4242/onboard-user');
    stripeFetch
      .then((res) => {
        console.log(res.data.url);
        console.log(res.data.id);

        // window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err); 
      });
  };

  const handleStripeDisconnection = () => {
    updateUser(parsedUser.id, { stripeId: '' });
    if (setConnections) {
      setConnections((prevState) => ({ ...prevState, stripe: false }));
    }
  };

  return (
    <>
      {connections.stripe ? (
        <div>
          <CardDescription className="mb-2 mt-2 text-black font-medium">
            Cash Payouts Sending To:
          </CardDescription>
          <CardDescription className="">{stripeId}</CardDescription>
          <Button
            className="flex font-normal text-sm p-0 text-sky-500"
            variant="link"
            onClick={handleStripeDisconnection}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <>
          <CardDescription className="text-slate-900	font-semibold text-sm mt-6">
            Setup card payouts
          </CardDescription>
          <Button
            className="flex items-center mt-3 mb-3 w-full font-normal text-sm "
            onClick={handleStripeConnection}
            disabled={loading}
          >
            {missingStripeInfo
              ? 'Complete your Stripe account first'
              : 'Connect Stripe'}
            <img
              className="h-6 translate-y-[.03rem] ml-2"
              src="../../public/stripeLogo.png"
              alt="Matter Logo"
            />{' '}
          </Button>
        </>
      )}
    </>
  );
};

export default StripeConnection;
