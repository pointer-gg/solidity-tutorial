import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import MetaMaskAccountProvider from '../components/meta-mask-account-provider';

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskAccountProvider>
      <Toaster />
      <Component {...pageProps} />
    </MetaMaskAccountProvider>
  )
}

export default MyApp
