import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0xe3a6ECEA5217D4213964eB734eae0A49BCea6De9';
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
