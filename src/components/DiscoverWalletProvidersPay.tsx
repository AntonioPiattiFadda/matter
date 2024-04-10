/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useSyncProviders } from '../Hooks/useSyncProviders';
import { Button } from './ui/button';
import Web3 from 'web3';
import axios from 'axios';
import PopUpMetamask from './PopUpMetamask';
import { RegisteredSubscription } from 'web3-eth';
import { updateInvoice } from '@/Services';

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

interface DiscoverWalletProvidersProps {
  recipientWallet: string;
  totalAmount: number;
  invoiceId: string;
}

export const DiscoverWalletProvidersPay = ({
  recipientWallet,
  totalAmount,
  invoiceId,
}: DiscoverWalletProvidersProps) => {
  const [showPopUp, setShowPopUp] = useState({
    status: false,
    message: '',
  });
  const [transactionHash, setTransactionHash] = useState('');

  const user = window.sessionStorage.getItem('user');
  const parserUser = JSON.parse(user || '{}');

  const providers = useSyncProviders();
  

  async function convertDollarsToEth(dollars: number) {
    const ethPrice = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
    );
    const result = ethPrice.data.result.ethusd;
    const ethAmount = dollars / result;
    return ethAmount;
  }

  const showPopUpMessage = (message: string) => {
    setShowPopUp({
      status: true,
      message: message,
    });
    setTimeout(() => {
      setShowPopUp({
        status: false,
        message: '',
      });
    }, 3000);
  };

  async function sendEth(dollars: number) {
    try {
      // Asegúrate de que el navegador del usuario tenga MetaMask instalado.
      if ((window as any).ethereum) {
        await (window as any).ethereum.enable(); // Solicita al usuario que permita acceder a su cuenta de MetaMask
        const web3 = new Web3((window as any).ethereum);
        const myAccounts = await web3.eth.getAccounts();
        const senderWallet = myAccounts[0]; // La dirección del remitente, toma la primera cuenta de MetaMask

        const ethAmount = await convertDollarsToEth(dollars); // Convierte dólares a ETH

        if (!ethAmount) return;

        const ethAmountInWei = web3.utils.toWei(ethAmount.toString(), 'ether');
        const isNetworkCorrect = await checkNetwork(web3); // Verifica si la red es correcta
        if (isNetworkCorrect) {
          // Envía ETH
          const transactionInfo = await web3.eth.sendTransaction({
            from: senderWallet,
            to: recipientWallet,
            value: ethAmountInWei,
          });
          setTransactionHash(transactionInfo.transactionHash.toString());
          updateInvoice(parserUser.id, invoiceId, {
            status: 'paid',
            metamaskHash: transactionInfo.transactionHash.toString(),
            payDate: new Date(),
          });
          setShowPopUp({
            status: true,
            message: 'Transaction successful',
          });
          //NOTE - Mostar al usuario transactionInfo.transactionHash y el stauts 1 succes 0 error en un popup
          //FIXME - Boton de ver en el explorador
        } else {
          showPopUpMessage('Please connect to the Binance Smart Chain network');
        }
      } else {
        showPopUpMessage('Please install MetaMask');
      }
    } catch (error) {
      showPopUpMessage('Error sending transaction');
      console.error(error);
    }
  }
  const NETWORK_ID = '97';

  const checkNetwork = async (web3: Web3<RegisteredSubscription>) => {
    const chainId = await web3.eth.getChainId();
    const isCorrect = chainId.toString() === NETWORK_ID;
    return isCorrect;
  };

  return (
    <>
      <div className="relative">
        {showPopUp.status && (
          <PopUpMetamask
            message={showPopUp.message}
            transactionHash={transactionHash}
          />
        )}
        {providers.length > 0 ? (
          providers?.map((provider: EIP6963ProviderDetail) => (
            <div key={provider.info.uuid}>
              <Button
                className="flex mt-3  w-full font-normal	text-sm"
                onClick={() => sendEth(totalAmount)}
              >
                <img
                  className="h-6 translate-y-[.03rem] ml-2"
                  src="../../public/ETHLogo.png"
                  alt="Matter Logo"
                />{' '}
                Pay with ETH
              </Button>
            </div>
          ))
        ) : (
          <div>There are no announced providers.</div>
        )}
      </div>
      <hr />
    </>
  );
};
