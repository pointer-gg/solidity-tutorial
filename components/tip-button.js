import { useState } from "react";
import { contractAddress } from "../utils/contractAddress"
import SecondaryButton from "./secondary-button";
import abi from "../utils/Keyboards.json"
import { ethers } from "ethers";


export default function TipButton({ethereum, connectedAccount, index}) {
  const [mining, setMining] = useState(false)

  const contractABI = abi.abi;

  const submitTip = async (e) => {
    if (!ethereum) {
      console.error('Ethereum object is required to submit a tip');
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const keyboardsContract = new ethers.Contract(contractAddress, contractABI, signer);

    const tipTxn = await keyboardsContract.tip(index, {value: ethers.utils.parseEther("0.01")})
    setMining(true);
    console.log('Tip transaction started...', tipTxn.hash)

    await tipTxn.wait();
    setMining(false);
    console.log('Sent tip!', tipTxn.hash);
  }

  return <SecondaryButton onClick={submitTip}>
    {mining ? 'Tipping...' : 'Tip 0.01 eth!'}
  </SecondaryButton>
}