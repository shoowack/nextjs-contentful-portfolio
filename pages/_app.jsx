import '../styles/inner-page.scss';
import '../styles/swiper.scss';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/index.css';
import BreakpointIndicator from '@components/BreakpointIndicator';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

import localFont from '@next/font/local';

const graphik = localFont({
  src: [
    {
      path: './../assets/font/Graphik-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-ThinItalic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-SuperItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-Super.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-ExtralightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-RegularItalic.woff2',
      weight: 'normal',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-BoldItalic.woff2',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './../assets/font/Graphik-Extralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './../assets/font/Graphik-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-graphik',
});

const App = ({ Component, pageProps }) => {
  return (
    <>
      <BreakpointIndicator />
      <GoogleAnalytics trackPageViews />
      <ThemeProvider attribute="class">
        <main className={`${graphik.variable} font-graphik`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
