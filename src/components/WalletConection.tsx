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
import { Connections, User } from '@/types';
import MetamaskConectionInfo from './MetamaskConectionInfo';
import StripeConectionInfo from './StripeConectionInfo';
import { SaveCompanyInfoschema } from '@/Validator';
import { z, ZodError } from 'zod';
import CompanyInfo from './CompanyInfo';

interface WalletConectionProps {
  setConnections: React.Dispatch<
    React.SetStateAction<{
      userInfo: boolean;
      stripe: boolean;
      metamask: boolean;
    }>
  >;
  connections: Connections;
  user: User;
}

const WalletConection = ({
  setConnections,
  connections,
}: WalletConectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    businessEmail: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    taxId: '',
  });
  const [errors, setErrors] = useState<ZodError<unknown> | null>(null);

  // useEffect(() => {
  //   getUserByEmail(user.email).then((data) => {
  //     if (data) {
  //       setCompanyInfo({
  //         companyName: data.companyName,
  //         businessEmail: data.email,
  //         address: data.address,
  //         city: data.city,
  //         state: data.state,
  //         zip: data.zip,
  //         country: data.country,
  //         taxId: data.taxId,
  //       });
  //     }
  //   });
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'zip' || name === 'taxId') {
      setCompanyInfo({
        ...companyInfo,
        [name]: parseInt(value),
      });
      return;
    }
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };

  const handleSaveCompanyInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      SaveCompanyInfoschema.parse(companyInfo);
      //NOTE - Enviar la info a la base de datos

      setConnections((prevConnections: Connections) => ({
        ...prevConnections,
        userInfo: true,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);

        setTimeout(() => {
          setErrors(null);
        }, 3000);
      }
    }
  };

  const handleStripeConnection = () => {
    setConnections((prevConnections: Connections) => ({
      ...prevConnections,
      stripe: true,
    }));
  };

  const handleMetamaskConnection = () => {
    setConnections((prevConnections: Connections) => ({
      ...prevConnections,
      metamask: true,
    }));
  };
  // const handleStripeDisconnection = () => {
  //   setAllConected(false);
  // };

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
          {connections.userInfo ? (
            <CompanyInfo editable={true} />
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
                className={classNames('h-0 overflow-hidden pl-1 pr-1', {
                  'h-auto': showForm,
                })}
              >
                <CardDescription className="mb-4">
                  Your business information for invoicing
                </CardDescription>
                <form onSubmit={handleSaveCompanyInfo}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label className="text-sm" htmlFor="name">
                        Company Name
                      </Label>
                      <Input
                        className={classNames('h-9 ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'companyName';
                            }),
                        })}
                        id="code"
                        placeholder="Enter your company name"
                        name="companyName"
                        value={companyInfo.companyName}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="email">
                        Your Business Email (Cannot change)
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'businessEmail';
                            }),
                        })}
                        id="email"
                        placeholder="emailtheysignedupwith@gmail.com"
                        name="businessEmail"
                        value={companyInfo.businessEmail}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="adress">
                        Adress
                      </Label>
                      <Input
                        className={classNames('text-sm', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'address';
                            }),
                        })}
                        id="adress"
                        placeholder="860 Forest Ave"
                        name="address"
                        value={companyInfo.address}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="city">
                        City
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'city';
                            }),
                        })}
                        id="city"
                        placeholder="Palo Alto"
                        name="city"
                        value={companyInfo.city}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="state">
                        State
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'state';
                            }),
                        })}
                        id="state"
                        placeholder="California"
                        name="state"
                        value={companyInfo.state}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="zip">
                        Zip
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'zip';
                            }),
                        })}
                        id="zip"
                        type="number"
                        placeholder="94301"
                        name="zip"
                        value={companyInfo.zip}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="Country">
                        Country
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'country';
                            }),
                        })}
                        id="Country"
                        placeholder="Country"
                        name="country"
                        value={companyInfo.country}
                        onChange={handleChange}
                      />

                      <Label className="text-sm" htmlFor="taxId">
                        Tax ID
                      </Label>
                      <Input
                        className={classNames('text-sm ', {
                          'border-red-500':
                            errors &&
                            errors.issues.some((issue) => {
                              return issue.path[0] === 'taxId';
                            }),
                        })}
                        id="taxId"
                        type="number"
                        placeholder="12345"
                        name="taxId"
                        value={companyInfo.taxId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex w-full gap-3 mb-4 justify-between">
                    <Button
                      className="flex mt-2 w-[50%] bg-gray-200 text-black "
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex mt-2 w-[50%]">
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
            </>
          )}

          {connections.stripe ? (
            <StripeConectionInfo />
          ) : (
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
          )}

          {connections.metamask ? (
            <MetamaskConectionInfo />
          ) : (
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
