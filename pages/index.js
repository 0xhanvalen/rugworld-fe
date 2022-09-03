import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEthers } from "../contexts/EthersProviderContext";
import { useEffect, useState } from "react";
import { makeContract } from "../contract/makeContract";
import toast from "react-hot-toast";

export default function Home() {
  const { isUpdating, provider, signer, address, connectProvider } =
    useEthers();

  const [contract, setContract] = useState(null);

  async function getContract() {
    if (!!provider && !!address) {
      let network = await provider.getNetwork();
      let tempContract = makeContract(network.chainId, provider, signer);
      setContract(tempContract);
    }
  }

  useEffect(() => {
    getContract();
  }, [address, provider]);

  const pullTheRug = async () => {
    try {
    const transaction = await contract?.write.PUSH_THE_RUG_BUTTON();
    } catch (error) {
      console.log(error.reason);
      toast.error(error.reason);
    }
  }

  return (
    <>
      <div
        style={{ padding: `2rem`, display: `flex`, justifyContent: `center` }}
      >
        Welcome to Rug World!
      </div>

      <div
        style={{ padding: `2rem`, display: `flex`, justifyContent: `center` }}
      >
        {address && <>Connected Wallet: {address}</>}
        {!address && <button onClick={() => connectProvider()}>Connect</button>}
      </div>
      <div
        style={{ padding: `2rem`, display: `flex`, justifyContent: `center` }}
      >
        {contract?.write && (
          <>
            <div style={{ position: `relative` }} onClick={() => pullTheRug()}>
              <Image width={350} height={350} src="/rug.jpg" />
              <div
                style={{
                  position: `absolute`,
                  left: `50%`,
                  top: `50%`,
                  color: `white`,
                  fontWeight: `700`,
                  transform: `translateX(-50%) translateY(-50%)`
                }}
              >
                Pull Me
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
