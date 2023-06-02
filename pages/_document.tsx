import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>Ivan Suvak Martinovic Portfolio</title>
      <Head />
      <body className="bg-[#e9eaed] antialiased dark:bg-[#2c2d30]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
