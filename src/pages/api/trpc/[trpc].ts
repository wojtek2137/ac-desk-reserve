import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/trpc';
import { db } from '../../../server/db';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });
  console.log('session context',session);
  return {
    session,
    db
  };
}
export default createNextApiHandler({
    router: appRouter,
    createContext
});




// export type Context = Awaited<ReturnType<typeof createContext>>;