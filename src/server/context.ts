// src/server/context.ts
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions } from "../pages/api/auth/[...nextauth]";
export async function createContext(opts: CreateNextContextOptions) {
//   const session = await getSession({ req: opts.req });
  const session = await getServerSession(opts.req, opts.res, authOptions)

  // Debugging: Log the session
  console.log('Session in createContext:', session);

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;