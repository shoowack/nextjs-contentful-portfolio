// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/nearlock-app.scss';
import '../styles/inner-page.scss';
import '../styles/swiper.scss';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import '../styles/index.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed left-1 top-2 z-[1090] p-2 text-xs font-bold text-black md:left-2 md:top-2">
          <span className="rounded bg-yellow-400 p-1 px-1 sm:hidden">XS</span>
          <span className="hidden rounded bg-yellow-400 px-1 sm:inline-block md:hidden">SM</span>
          <span className="hidden rounded bg-yellow-400 px-1 sm:hidden md:inline-block lg:hidden">
            MD
          </span>
          <span className="hidden rounded bg-yellow-400 px-1 lg:inline-block xl:hidden">LG</span>
          <span className="hidden rounded bg-yellow-400 px-1 xl:inline-block">XL</span>
        </div>
      )}
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
};

export default App;
