import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/trpc';
import { db } from '../../../server/db';

export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({ db }),
});