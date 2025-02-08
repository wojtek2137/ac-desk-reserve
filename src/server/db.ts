// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// const sqlite = new Database('db.sqlite');

// export const reservations = sqliteTable('reservations', {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     deskId: integer('desk_id').notNull(),
//     dateFrom: text('date_from').notNull(),
//     dateTo: text('date_to').notNull()
// });

// export const db = drizzle(sqlite, { schema: { reservations } });

import '@/drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';
 
export const db = drizzle(sql, { schema });
 
// export const getUsers = async () => {
//   return db.query.users.findMany();
// };