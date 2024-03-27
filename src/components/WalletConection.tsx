import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import classNames from 'classnames';
import AllConnected from './AllConnected';

const WalletConection = ({ allConnected, setAllConnected }) => {
  const [showForm, setShowForm] = useState(false);
  // const [companyInfo, setCompanyInfo] = useState({
  //   name: '',
  //   email: '',
  //   adress: '',
  //   city: '',
  //   state: '',
  //   zip: '',
  //   country: '',
  //   taxId: '',
  // });

  const handleSaveCompanyInfo = () => {
    //NOTE -  - Logica de validacion del codigo
    setAllConnected(true);
  };

  const handleStripeConnection = () => {
    setAllConnected(true);
  };

  // const handleStripeDisconnection = () => {
  //   setAllConected(false);
  // };

  const handleMetamaskConnection = () => {
    setAllConnected(true);
  };

  // const handleMetamaskDisconnection = () => {
  //   setAllConected(false);
  // };

  return (
    <div>
      <Card
        className="w-[400px] sm-w-screen h-screen rounded-none"
        style={{
          borderTop: 'none',
          borderLeft: 'none',
          borderBottom: 'none',
        }}
      >
        <CardHeader>
          <CardTitle className="">
            {' '}
            <img
              className="h-7"
              src="../../public/matterLogo.png"
              alt="Matter Logo"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allConnected ? (
            <AllConnected />
          ) : (
            <>
              <CardDescription
                className={classNames('text-slate-900	font-semibold text-sm', {
                  hidden: showForm,
                })}
              >
                Complete yout account
              </CardDescription>

              <div
                className={classNames('h-0 overflow-hidden ', {
                  'h-auto': showForm,
                })}
              >
                <CardDescription className="mb-4">
                  Your business information for invoicing
                </CardDescription>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-sm" htmlFor="name">
                        Company Name
                      </Label>
                      <Input
                        className="h-9"
                        id="code"
                        placeholder="Enter your company name"
                      />

                      <Label className="text-sm" htmlFor="email">
                        Your Business Email (Cannot change)
                      </Label>
                      <Input
                        className="text-sm"
                        id="email"
                        placeholder="emailtheysignedupwith@gmail.com"
                      />

                      <Label className="text-sm" htmlFor="adress">
                        Adress
                      </Label>
                      <Input
                        className="text-sm"
                        id="adress"
                        placeholder="860 Forest Ave"
                      />

                      <Label className="text-sm" htmlFor="city">
                        City
                      </Label>
                      <Input id="city" placeholder="Palo Alto" />

                      <Label className="text-sm" htmlFor="state">
                        State
                      </Label>
                      <Input id="state" placeholder="California" />

                      <Label className="text-sm" htmlFor="zip">
                        Zip
                      </Label>
                      <Input id="zip" placeholder="94301" />

                      <Label className="text-sm" htmlFor="Country">
                        Country
                      </Label>
                      <Input id="Country" placeholder="Country" />

                      <Label className="text-sm" htmlFor="taxId">
                        Tax ID
                      </Label>
                      <Input id="taxId" placeholder="12345" />
                    </div>
                  </div>
                  <div className="flex w-full gap-3 mb-4 justify-between">
                    <Button
                      className="flex mt-2 w-[50%] bg-gray-200 text-black "
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex mt-2 w-[50%]"
                      onClick={handleSaveCompanyInfo}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </div>

              <Button
                className={classNames(
                  'flex mt-3 mb-3 w-full font-normal	 text-sm',
                  {
                    hidden: showForm,
                  }
                )}
                onClick={() => setShowForm(true)}
              >
                Add Your Company Details
              </Button>

              <>
                <CardDescription className="text-slate-900	font-semibold text-sm mt-6">
                  Setup card payouts
                </CardDescription>
                <Button
                  className="flex items-center mt-3 mb-3 w-full font-normal text-sm "
                  onClick={handleStripeConnection}
                >
                  Connect Stripe
                  <img
                    className="h-6 translate-y-[.03rem] ml-2"
                    src="../../public/stripeLogo.png"
                    alt="Matter Logo"
                  />{' '}
                </Button>
              </>

              <>
                <CardDescription className="text-slate-900	font-semibold text-sm mt-6">
                  Setup crypto payouts
                </CardDescription>
                <Button
                  className="flex mt-3  w-full font-normal	text-sm"
                  onClick={handleMetamaskConnection}
                >
                  Connect Metamask Wallet{' '}
                  <img
                    className="h-6 translate-y-[.03rem] ml-2"
                    src="../../public/MetaMaskLogo.png"
                    alt="Matter Logo"
                  />{' '}
                </Button>
              </>
            </>
          )}
          <CardDescription>
            <div className="flex w-full gap-3 mt-2">
              <Button
                className="flex p-1 text-slate-400 text-sm	"
                variant="link"
              >
                Log Out
              </Button>
              <Button
                className="flex p-1 text-slate-400 text-sm	"
                variant="link"
              >
                Support
              </Button>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConection;
