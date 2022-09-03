import "../styles/globals.css";
import { EthersContextFC } from "../contexts/EthersProviderContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <EthersContextFC>
      <Component {...pageProps} />
      <Toaster/>
    </EthersContextFC>
  );
}

export default MyApp;
