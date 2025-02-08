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

// export const UsersTable = pgTable(
//   'users',
//   {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     email: text('email').notNull(),
//     image: text('image').notNull(),
//     createdAt: timestamp('createdAt').defaultNow().notNull(),
//   },
//   (users) => {
//     return {
//       uniqueIdx: uniqueIndex('unique_idx').on(users.email),
//     };
//   },
// );