//src/server/trpc.ts
import { z } from 'zod';
import { db } from './db';
import { reservations } from './schema'; 
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import { and, eq } from 'drizzle-orm';
 
const t = initTRPC.context<Context>().create();

export const protectedProcedure = t.procedure.use(function isAuthed(opts) {
  if (!opts.ctx.session?.user?.email) {
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

    getDesks: t.procedure.query(async () => {
      const value = Array.from({ length: 20 }, (_, i) => i + 1);
      return value;
    }),

    reserveDesk: protectedProcedure
  .input(z.object({
    deskId: z.number(),
    dateFrom: z.string(),
    dateTo: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const { deskId, dateFrom, dateTo } = input;
    const userId = ctx.session.user?.email || ''; //email as user ID
    const userName = ctx.session.user?.name || 'Anonymous';

  
    const existingReservation = await db
      .select()
      .from(reservations)
      .where(
        and(
          eq(reservations.deskId, deskId),
          eq(reservations.dateFrom, dateFrom)
        ) 
      ) 
      .execute(); 

    if (existingReservation.length > 0) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'This desk is already reserved for the selected date.',
      });
    }

    await db.insert(reservations).values({
      deskId,
      dateFrom,
      dateTo,
      userId,
      userName,
    });

    return { success: true, message: 'Reservation successful!' };
  }),
  
    getReservations: protectedProcedure.query(async () => {
        const allReservations = await db.select().from(reservations);
        return allReservations;
    }), // to be done nextk
});

export type AppRouter = typeof appRouter;