import { useState, useEffect } from "react";
import Keyboard from "../components/keyboard";
import PrimaryButton from "../components/primary-button";
import { UserCircleIcon } from "@heroicons/react/solid"
import TipButton from "../components/tip-button";
import getKeyboardsContract from "../utils/getKeyboardsContract";
import { useMetaMaskAccount } from "../components/meta-mask-account-provider";
import Footer from "../components/footer";
import addressesEqual from "../utils/addressesEqual";
import { toast } from "react-hot-toast"
import { ethers } from "ethers";

export default function Home() {
  const { ethereum, connectedAccount, connectAccount } = useMetaMaskAccount();
  const [keyboards, setKeyboards] = useState([]);
  const [keyboardsLoading, setKeyboardsLoading] = useState(false);

  const keyboardsContract = getKeyboardsContract(ethereum);

  // add event handlers
  const addContractEventHandlers = () => {
    keyboardsContract?.removeAllListeners();

    if(keyboardsContract && connectedAccount) {
      keyboardsContract.on('TipSent', (recipient, amount) => {
        if(addressesEqual(recipient, connectedAccount)) {
          toast(`You received a tip of ${ethers.utils.formatEther(amount)} eth!`);
        }
      })

      keyboardsContract.on('KeyboardCreated', async (keyboard) => {
        if(connectedAccount && !addressesEqual(keyboard.owner, connectedAccount)) {
          toast('Somebody created a new keyboard!', { id: JSON.stringify(keyboard) })
          await getKeyboards();
        }
      })
    }
  }
  useEffect(addContractEventHandlers, [!!keyboardsContract, connectedAccount]);


  const getKeyboards = async () => {
    if (keyboardsContract && connectedAccount) {
      setKeyboardsLoading(true);
      const keyboards = await keyboardsContract.getKeyboards();
      console.log('Retrieved keyboards', keyboards);
      setKeyboardsLoading(false);
      setKeyboards(keyboards);
    }
  }
  useEffect(() => getKeyboards(), [!!keyboardsContract, connectedAccount])

  const renderKeyboards = () => {
    if (!ethereum) {
      return <p>Please install MetaMask to connect to this site</p>
    }

    if (!connectedAccount) {
      return <PrimaryButton onClick={connectAccount}>Connect MetaMask Wallet</PrimaryButton>
    }

    // If we have keyboards, show them even if more are loading
    if(keyboards.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
          <div className="grid grid-cols-2 gap-2">
            {keyboards.map(
              ([kind, isPBT, filter, owner], i) => (
                <div key={i} className="relative">
                  <Keyboard kind={kind} isPBT={isPBT} filter={filter} />
                  <span className="absolute top-1 right-6">
                    {addressesEqual(owner, connectedAccount) ?
                      <UserCircleIcon className="h-5 w-5 text-indigo-100" /> :
                      <TipButton keyboardsContract={keyboardsContract} index={i} />
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )
    }

    if(keyboardsLoading) {
      return (
        <div className="flex flex-col gap-4">
          <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
          <p>Loading Keyboards...</p>
        </div>
      )
    }

    if (keyboards.length === 0) {
      return (
        <div className="flex flex-col gap-4">
          <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
          <p>No keyboards yet!</p>
        </div>
      )
    }


  }

  return (
    <div className=''>
      <main className='max-w-3xl mx-auto'>
        <h1 className='mt-48 text-4xl'>
          Solidity Keyboard Generator
        </h1>

        {renderKeyboards()}
      </main>
      <Footer />
    </div>
  );
}
