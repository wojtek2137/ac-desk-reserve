import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const sqlite = new Database('db.sqlite');

export const reservations = sqliteTable('reservations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    deskId: integer('desk_id').notNull(),
    date: text('date').notNull(),
});

export const db = drizzle(sqlite, { schema: { reservations } });