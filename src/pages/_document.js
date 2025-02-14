import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pl">  
      <Head>
        <link rel="manifest" href="/manifest.json" />

        <link rel="icon" href="/web-app-manifest-192x192.png" />  
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png"/> 

        <meta name="theme-color" content="#004CFF" />
        <meta name="description" content="Mobile app for AC desk reservations" />  
      </Head>
      <body>
        <Main />  
        <NextScript />
      </body>
    </Html>
  );
}