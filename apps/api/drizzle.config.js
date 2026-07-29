import { defineConfig } from 'drizzle-kit';

import { config } from './src/config.js';

export default defineConfig({
	casing: 'snake_case',
	dialect: 'postgresql',
	schema: './src/database/schema.js',
	dbCredentials: {
		url: config.DATABASE_URL,
	},
});
