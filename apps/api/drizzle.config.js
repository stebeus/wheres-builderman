import { defineConfig } from 'drizzle-kit';

import { config } from './source/config.js';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './source/database/schema.js',
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
