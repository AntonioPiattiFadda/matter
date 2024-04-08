import { useState } from 'react';
import { useSyncProviders } from '../Hooks/useSyncProviders';
import { Button } from './ui/button';
import Web3 from 'web3';
import axios from 'axios';
import PopUpMetamask from './PopUpMetamask';

interface DiscoverWalletProvidersProps {
  recipientWallet: string;
  totalAmount: number;
}

export const DiscoverWalletProvidersPay = ({
  recipientWallet,
  totalAmount,
}: DiscoverWalletProvidersProps) => {
  const [showPopUp, setShowPopUp] = useState({
    status: false,
    message: '',
  });
  const [transactionHash, setTransactionHash] = useState('');

  const providers = useSyncProviders();
  const web3Provider = new Web3(window.ethereum);

  // const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
  //   const accounts = await providerWithInfo.provider
  //     .request({ method: 'eth_requestAccounts' })
  //     .catch(console.error);

  //   if (accounts?.[0]) {
  //     setSelectedWallet(providerWithInfo);
  //     setUserAccount(accounts?.[0]);

  //     // TODO Guardar la direccion del pag para que el cliente pueda pagar
  //   }
  // };

  async function convertDollarsToEth(dollars) {
    const ethPrice = await axios.get(
      'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=GDPSCFFAMY8AVYDUJ2YDD6NDW51GZUSP35'
    );
    const result = ethPrice.data.result.ethusd;
    const ethAmount = dollars / result;
    return dollars;
  }

  const showPopUpMessage = (message) => {
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

  async function sendEth(dollars) {
    try {
      // Asegúrate de que el navegador del usuario tenga MetaMask instalado.
      if (window.ethereum) {
        await window.ethereum.enable(); // Solicita al usuario que permita acceder a su cuenta de MetaMask
        const web3 = new Web3(window.ethereum);
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
          console.log(transactionInfo);
          setTransactionHash(transactionInfo.transactionHash.toString());
          showPopUpMessage('Transaction successful with hash');
          //NOTE - Mostar al usuario transactionInfo.transactionHash y el stauts 1 succes 0 error en un popup
          // Me trae un success y un hash que le vamos a mostrar al usuario.
          console.log(
            `Enviado ${ethAmount} ETH desde ${senderWallet} a ${recipientWallet}`
          );
        } else {
          showPopUpMessage('Por favor, cambia a la red');
        }
      } else {
        showPopUpMessage('Por favor, instala MetaMask');
      }
    } catch (error) {
      showPopUpMessage('Error enviando ETH');
      console.error(error);
    }
  }
  const NETWORK_ID = '97';

  const checkNetwork = async (web3) => {
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
