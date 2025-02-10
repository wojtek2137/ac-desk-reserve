//src/server/schema.ts
import {
  pgTable,
  integer,
  text,
  smallserial,
} from 'drizzle-orm/pg-core';
 
export const reservations = pgTable('reservations', {
    id: smallserial(),
    deskId: integer('desk_id').notNull(),
    dateFrom: text('date_from').notNull(),
    dateTo: text('date_to').notNull()
});

