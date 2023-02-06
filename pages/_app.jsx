import '../styles/inner-page.scss';
import '../styles/swiper.scss';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/index.css';
import BreakpointIndicator from '@components/BreakpointIndicator';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <BreakpointIndicator />
      <GoogleAnalytics trackPageViews />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
