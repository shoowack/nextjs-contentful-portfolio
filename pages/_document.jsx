import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <title>Ivan Suvak Martinovic Portfolio</title>
        <Head />
        <body className="bg-[#e9eaed] dark:bg-[#2c2d30] antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
