import '../styles/inner-page.scss';
import '../styles/swiper.scss';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/index.css';
import BreakpointIndicator from '@components/BreakpointIndicator';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <BreakpointIndicator />
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
};

export default App;
