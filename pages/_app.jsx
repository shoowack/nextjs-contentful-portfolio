import '../styles/inner-page.scss';
import '../styles/swiper.scss';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/index.css';
import BreakpointIndicator from '@components/BreakpointIndicator';
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <BreakpointIndicator />
      <GoogleAnalytics trackPageViews />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
