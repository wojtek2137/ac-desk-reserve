//src/server/trpc.ts
import { z } from 'zod';
import { db } from './db'; // Import Drizzle
import { reservations } from './schema'; // Import tabeli reservations
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
 
const t = initTRPC.context<Context>().create();

export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  if (!opts.ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return opts.next({
    ctx: {
      // Infers the `session` as non-nullable
      session: opts.ctx.session,
    },
  });
});

export const appRouter = t.router({
    getDesks: t.procedure.query(async () => {
        return [
            { id: 1, name: 'Biurko 1' },
            { id: 2, name: 'Biurko 2' },
            { id: 3, name: 'Biurko 3' },
        ];
    }),
    reserveDesk: t.procedure
        .input(z.object({ deskId: z.number(),
            dateFrom: z.string(), dateTo: z.string() }))
        .mutation(async ({ input }) => {
            // Dodaj rezerwację do bazy danych
            const { deskId, dateFrom, dateTo } = input;
         

            await db.insert(reservations).values({ deskId, dateFrom, dateTo });
            return { success: true, message: 'Rezerwacja udana!' };
        }),
    getReservations: protectedProcedure.query(async () => {
        // Pobierz wszystkie rezerwacje z bazy danych
        const allReservations = await db.select().from(reservations);
        return allReservations;
    }),
});

export type AppRouter = typeof appRouter;