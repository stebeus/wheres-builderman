import { defineConfig } from 'drizzle-kit';

import { config } from './source/config.ts';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './source/database/schema.ts',
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
