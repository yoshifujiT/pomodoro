import { AppProps } from 'next/app';
import 'normalize.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
