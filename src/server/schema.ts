import {
  pgTable,
  integer,
  text,
  smallserial,
  varchar,
} from 'drizzle-orm/pg-core';

export const reservations = pgTable('reservations', {
  id: smallserial('id').primaryKey(),
  deskId: integer('desk_id').notNull(),
  dateFrom: text('date_from').notNull(),
  dateTo: text('date_to').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(), 
  userName: varchar('user_name', { length: 255 }).notNull(), 
});