import { useState, useEffect } from "react";
import PrimaryButton from "../components/primary-button";

export default function Home() {

  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);

  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log('We have an authorized account: ', account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet")
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      handleAccounts(accounts);
    }
  };
  useEffect(() => getConnectedAccount(), []);

  const connectAccount = async () => {
    if (!ethereum) {
      alert('MetaMask is required to connect an account');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    handleAccounts(accounts);
  };

  const renderKeyboards = () => {
    if(!ethereum) {
      return <p>Please install MetaMask to connect to this site</p>
    }

    if(!connectedAccount) {
      return <PrimaryButton onClick={connectAccount}>Connect MetaMask Wallet</PrimaryButton>
    }

    return <p>Connected Account: {connectedAccount}</p>
  }

  return (
    <div className=''>
      <main className='max-w-3xl mx-auto'>
        <h1 className='mt-48 text-4xl'>
          Solidity Keyboard Generator
        </h1>
        {/* <img
          className='h-64 mx-auto mt-8'
          src='keyboards/eighty-percent/ABS.png'
        /> */}

        {renderKeyboards()}

      </main>

      <footer className='mx-auto mt-48 text-center'>
        <a
          href='https://www.pointer.gg?utm_source=stackblitz-solidity'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn web3 dev and earn crypto rewards at{" "}
          <span className=''>Pointer</span>
        </a>
        <p>Art from Joanne Li @joanne on Figma <a href='keeybs.com' className='underline'>keeybs.com</a> <a href='https://creativecommons.org/licenses/by/4.0/' className="underline">CC 4.0</a></p>
      </footer>
    </div>
  );
}
