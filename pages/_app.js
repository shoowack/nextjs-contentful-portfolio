import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/nearlock-app.scss'
import './../styles/inner-page.scss'
import './../styles/swiper.scss'
import { GoogleAnalytics } from "nextjs-google-analytics";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  );
};

export default App;