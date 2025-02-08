import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/server/schema.ts',
    dbCredentials: {
        url: process.env.POSTGRES_URL ?? '',
    },
});