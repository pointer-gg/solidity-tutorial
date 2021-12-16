import abi from "../utils/Keyboards.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react/cjs/react.development";

const contractAddress = '0xA9569fc7386889ecdD9267F340F6e26570cb3953';
const contractABI = abi.abi;

export default function useKeyboardsContract(ethereum) {
  const [contract, setContract] = useState(undefined);

  const getContract = () => {
    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract)
    }
  }

  // Only re-run it when `if(ethereum)` changes, 
  // not every time any state of `ethereum` changes
  useEffect(getContract, [!!ethereum]);

  return contract;
}
