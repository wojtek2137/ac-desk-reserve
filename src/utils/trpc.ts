import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/trpc';
function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `https://ac-desk-reserve.vercel.app`;
  // return 'http://localhost:3000';
}
export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @see https://trpc.io/docs/v11/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            console.log('opts',opts);
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  /**
   * @see https://trpc.io/docs/v11/ssr
   **/
  ssr: false,
});