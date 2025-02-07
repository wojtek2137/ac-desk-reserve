import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from './db'; // Import Drizzle
import { reservations } from './db'; // Import tabeli reservations

const t = initTRPC.create();

export const appRouter = t.router({
    getDesks: t.procedure.query(async () => {
        return [
            { id: 1, name: 'Biurko 1' },
            { id: 2, name: 'Biurko 2' },
            { id: 3, name: 'Biurko 3' },
        ];
    }),
    reserveDesk: t.procedure
        .input(z.object({ deskId: z.number(), date: z.string() }))
        .mutation(async ({ input }) => {
            // Dodaj rezerwację do bazy danych
            const { deskId, date } = input;
            await db.insert(reservations).values({ deskId, date });
            return { success: true, message: 'Rezerwacja udana!' };
        }),
    getReservations: t.procedure.query(async () => {
        // Pobierz wszystkie rezerwacje z bazy danych
        const allReservations = await db.select().from(reservations);
        return allReservations;
    }),
});

export type AppRouter = typeof appRouter;