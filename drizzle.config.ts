// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   dialect: 'sqlite', // Use SQLite as the database dialect
//   schema: './src/server/db.ts', // Path to your schema file
//   out: './migrations', // Output directory for migrations
//   dbCredentials: {
//     url: 'db.sqlite', // Path to your SQLite database file
//   },
// });
import '@/drizzle/envConfig';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
    // dialect: 'postgresql',
    schema: './src/server/schema.ts',
    dbCredentials: {
        url: process.env.POSTGRES_URL,
    },
});