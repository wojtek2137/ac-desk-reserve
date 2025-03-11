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
    const userId = ctx.session.user?.email || ''; // email as user ID
    const userName = ctx.session.user?.name || 'Anonymous';

    const userReservations = await db
      .select()
      .from(reservations)
      .where(
        and(
          eq(reservations.userId, userId),
          eq(reservations.dateFrom, dateFrom)
        )
      )
      .execute();

    if (userReservations.length > 0) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'You can only reserve one desk per day.',
      });
    }

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

  getReservations: t.procedure.query(async () => {
    const allReservations = await db.select().from(reservations);
    return allReservations;
  }),

  removeReservation: protectedProcedure
    .input(z.object({
      deskId: z.number(),
      dateFrom: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { deskId, dateFrom } = input;
      const userId = ctx.session.user?.email || ''; 

      const existingReservation = await db
        .select()
        .from(reservations)
        .where(
          and(
            eq(reservations.deskId, deskId),
            eq(reservations.dateFrom, dateFrom),
            eq(reservations.userId, userId)
          ) 
        ) 
        .execute(); 

      if (existingReservation.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Reservation not found or you do not have permission to remove it.',
        });
      }

      await db
        .delete(reservations)
        .where(
          and(
            eq(reservations.deskId, deskId),
            eq(reservations.dateFrom, dateFrom),
            eq(reservations.userId, userId)
          ) 
        ) 
        .execute();

      return { success: true, message: 'Reservation removed successfully!' };
    }),
});

export type AppRouter = typeof appRouter;