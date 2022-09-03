import {ethers} from "ethers";
import { ABI } from "./ABI";

export const makeContract = (chainID, provider, signer) => {
    let contractAddress;
    
    if (chainID == "0x1") {
        contractAddress = "0xFeFD895741b95c38f0a2D17df8B1dCb1cA4E5Eac";
    }
    
    // if (chainID == "0x64") {
    //     contractAddress = "0x28baAB260cC2963a4A0d084cDBE8Af6CC5cC960C";
    // }

    if (typeof contractAddress == "undefined") {
        alert("You must change your chain to mainnet");
        return null;
    }

    const read = new ethers.Contract(contractAddress, ABI, provider);
    const write = new ethers.Contract(contractAddress, ABI, signer);
    return {read, write};
}