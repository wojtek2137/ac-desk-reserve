import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import { db } from './db'; // Import Drizzle
import { reservations } from './schema'; // Import tabeli reservations

const t = initTRPC.context().create();
export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  if (!opts.ctx.session?.user?.email) {  // UNCOMMENT THIS CHECK
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return opts.next({
    ctx: {
      session: opts.ctx.session,
    },
  });
});
export const appRouter = t.router({
    getDesks: protectedProcedure.query(async () => {
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
    getReservations: t.procedure.query(async () => {
        // Pobierz wszystkie rezerwacje z bazy danych
        const allReservations = await db.select().from(reservations);
        return allReservations;
    }),
});

export type AppRouter = typeof appRouter;