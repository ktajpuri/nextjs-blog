import Amplify from 'aws-amplify'
import '../styles/global.css'
import config from '../src/aws-exports';
Amplify.configure({
  ...config, ssr: true
});

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}