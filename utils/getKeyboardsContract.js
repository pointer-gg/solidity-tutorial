import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const contractAddress = '0xA9569fc7386889ecdD9267F340F6e26570cb3953';
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
