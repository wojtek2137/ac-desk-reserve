//src/pages/_app.tsx
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return <SessionProvider session={session}>
            <Component {...pageProps} /> 
      </SessionProvider>;
};
export default trpc.withTRPC(MyApp);


// ## MVP
// 1. desk reservations
// 2. my reservations view
// 3. easy access to current date


// ## MVP 2.0
// 1. selecting date and time
// 2. mobile app view?
// 3. 