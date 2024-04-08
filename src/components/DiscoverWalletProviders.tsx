import { useState } from 'react';
import { useSyncProviders } from '../Hooks/useSyncProviders';
import { formatAddress } from '@/utils';
import { CardDescription } from './ui/card';
import { Button } from './ui/button';
import Web3 from 'web3';

interface DiscoverWalletProvidersProps {
  connections: {
    userInfo: boolean;
    stripe: boolean;
    metamask: boolean;
  };
  setConnections?: React.Dispatch<
    React.SetStateAction<{
      userInfo: boolean;
      stripe: boolean;
      metamask: boolean;
    }>
  >;
}

export const DiscoverWalletProviders = ({
  setConnections,
  connections,
}: DiscoverWalletProvidersProps) => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState<string>('');

  const providers = useSyncProviders();
  const web3Provider = new Web3(window.ethereum);

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    const accounts = await providerWithInfo.provider
      .request({ method: 'eth_requestAccounts' })
      .catch(console.error);

    if (accounts?.[0]) {
      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
      window.sessionStorage.setItem('userAccount', accounts?.[0]);
      if (setConnections) {
        setConnections((prevState) => ({ ...prevState, metamask: true }));
      }
      console.log(accounts?.[0]);
      // TODO Guardar la direccion del pag para que el cliente pueda pagar
    }
  };

  const handleDisconnect = () => {
    setSelectedWallet(undefined);
    setUserAccount('');
    window.sessionStorage.removeItem('userAccount');
    if (setConnections) {
      setConnections((prevState) => ({ ...prevState, metamask: false }));
    }
  };

  return (
    <>
      {!connections.metamask && (
        <>
          {' '}
          <div>
            {providers.length > 0 ? (
              providers?.map((provider: EIP6963ProviderDetail) => (
                <div key={provider.info.uuid}>
                  <CardDescription className="text-slate-900	font-semibold text-sm mt-6">
                    Setup crypto payouts
                  </CardDescription>
                  <Button
                    className="flex mt-3  w-full font-normal	text-sm"
                    onClick={() => handleConnect(provider)}
                  >
                    Connect Metamask Wallet{' '}
                    <img
                      className="h-6 translate-y-[.03rem] ml-2"
                      src="../../public/MetaMaskLogo.png"
                      alt="Matter Logo"
                    />{' '}
                  </Button>
                </div>
              ))
            ) : (
              <div>There are no announced providers.</div>
            )}
          </div>
          <hr />
        </>
      )}
      {userAccount && (
        <div>
          <CardDescription className="mb-2 mt-2 text-black font-medium">
            Crypto Payouts Sending To:
          </CardDescription>
          <CardDescription className="">
            {formatAddress(userAccount)}
          </CardDescription>
          <Button
            className="flex font-normal text-sm p-0 text-sky-500"
            variant="link"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </div>
      )}
    </>
  );
};
