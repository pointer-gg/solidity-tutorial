import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Keyboard from "../components/keyboard";
import PrimaryButton from "../components/primary-button";
import { UserCircleIcon } from "@heroicons/react/solid"
import TipButton from "../components/tip-button";
import useEthereum from "../hooks/useEthereum";
import useKeyboardsContract from "../hooks/useKeyboardsContract";
import Footer from "../components/footer";
import { toast } from "react-hot-toast";
import addressesEqual from "../utils/addressesEqual";

export default function Home() {
  const { ethereum, connectedAccount, connectAccount } = useEthereum();
  const keyboardsContract = useKeyboardsContract(ethereum)

  const [keyboards, setKeyboards] = useState([])

  const getKeyboards = async () => {
    if (ethereum && keyboardsContract) {
      const keyboards = await keyboardsContract.getKeyboards();
      console.log('Retrieved keyboards...', keyboards)
      setKeyboards(keyboards)
    }
  }
  useEffect(getKeyboards, [ethereum, keyboardsContract])

  const addContractEventHandlers = () => {
    if(keyboardsContract) {
      keyboardsContract.on('KeyboardCreated', async ({owner}) => {
        if(!addressesEqual(owner, connectedAccount)) {
          toast('Somebody just created a keyboard!')
          await getKeyboards()
        }
      });

      keyboardsContract.on('TipSent', (recipient, amount) => {
        if(addressesEqual(recipient, connectedAccount)) {
          toast(`You were just tipped ${ethers.utils.formatEther(amount)} eth!`);
        }
      });
    }
  }

  useEffect(addContractEventHandlers, [keyboardsContract])

  const renderKeyboards = () => {
    if (!ethereum) {
      return <p>Please install MetaMask to connect to this site</p>
    }

    if (!connectedAccount) {
      return <PrimaryButton onClick={connectAccount}>Connect MetaMask Wallet</PrimaryButton>
    }

    if (keyboards.length === 0) {
      return (
        <div className="flex flex-col gap-4">
          <PrimaryButton type="link" href="/create">Create a Keyboard!</PrimaryButton>
          <p>No keyboards yet!</p>
        </div>
      )
    }

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
                    <TipButton ethereum={ethereum} connectedAccount={connectedAccount} index={i} />
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>
    )
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
