import Document, { Html, Head, Main, NextScript } from 'next/document';
import { dom } from '@fortawesome/fontawesome-svg-core';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <title>Ivan Suvak Martinovic Portfolio</title>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&subset=latin-ext"
            rel="stylesheet"
          />
          <style type="text/css">{dom.css()}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
