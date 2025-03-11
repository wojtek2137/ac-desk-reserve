import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: queryClient, schema: schema });


// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
// import * as schema from './schema';
// import 'dotenv/config';
//
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL ?? '',
// });
//
// export const db = drizzle(pool, { schema });
