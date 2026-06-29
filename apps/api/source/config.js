import { env, loadEnvFile } from 'node:process';

import * as z from 'zod';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

const databaseUrlRegex = /(postgres(?:ql)?):\/\/(?:([^@\s]+)@)?([^/\s]+)(?:\/(\w+))?(?:\?(.+))?/;

const envSchema = z.object({
	CLIENT_URL: z.url().default('*'),
	DATABASE_URL: z.url().regex(databaseUrlRegex),
	PORT: z.coerce.number().int().positive().default(3000),
});

const { success, error, data } = z.safeParse(envSchema, env);

if (!success) throw new Error(z.prettifyError(error));

export const config = data;
