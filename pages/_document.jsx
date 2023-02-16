import Document, { Html, Head, Main, NextScript } from 'next/document';
import { dom } from '@fortawesome/fontawesome-svg-core';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <title>Ivan Suvak Martinovic Portfolio</title>
        <Head>
          <style type="text/css">{dom.css()}</style>
        </Head>
        <body className="bg-[#e9eaed] dark:bg-[#2c2d30] antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
