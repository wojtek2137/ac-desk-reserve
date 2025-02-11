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
