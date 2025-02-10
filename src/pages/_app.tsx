// //src/pages/_app.tsx
// import { useState } from 'react';
// import { trpc } from '../utils/trpc';
// import { httpBatchLink } from '@trpc/client';
// import type { AppProps } from 'next/app';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SessionProvider } from 'next-auth/react';

// function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: '/api/trpc',
//         }),
//       ],
//     })
//   );

//   return (
//     <SessionProvider session={session}>
//       <trpc.Provider client={trpcClient} queryClient={queryClient}>
//         <QueryClientProvider client={queryClient}>
//           <Component {...pageProps} />
//         </QueryClientProvider>
//       </trpc.Provider>
//     </SessionProvider>
//   );
// }

// export default MyApp;

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