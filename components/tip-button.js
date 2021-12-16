import { useState } from "react";
import SecondaryButton from "./secondary-button";
import { ethers } from "ethers";
import useKeyboardsContract from "../hooks/useKeyboardsContract";


export default function TipButton({ethereum, connectedAccount, index}) {
  const keyboardsContract = useKeyboardsContract(ethereum)

  const [mining, setMining] = useState(false)

  const submitTip = async (e) => {
    if (keyboardsContract && connectedAccount) {
      const tipTxn = await keyboardsContract.tip(index, {value: ethers.utils.parseEther("0.01")})
      setMining(true);
      console.log('Tip transaction started...', tipTxn.hash)

      await tipTxn.wait();
      setMining(false);
      console.log('Sent tip!', tipTxn.hash);
    }
  }

  return <SecondaryButton onClick={submitTip} disabled={mining}>
    {mining ? 'Tipping...' : 'Tip 0.01 eth!'}
  </SecondaryButton>
}