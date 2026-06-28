import { drizzle } from 'drizzle-orm/postgres-js';

import { config } from '#root/config.ts';

export const database = drizzle({
	casing: 'snake_case',
	connection: config.DATABASE_URL,
});
