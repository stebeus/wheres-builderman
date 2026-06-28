import * as z from 'zod';

import { users } from '#root/database/schema.ts';

import { authenticate, isUsernameAvailable } from './services.ts';

const { username } = users;

const bestTimeInMs = z.coerce.number().int().positive();
const alphanumericRegex = /\w/g;

export const signInSchema = z
	.object({
		username: z.string(),
		password: z.string(),
		bestTimeInMs,
	})
	.refine(authenticate, 'Invalid credentials');

export const userSchema = z.object({
	username: z
		.string()
		.min(1, 'Username is required')
		.max(username.length as number, `Username cannot be longer than ${username.length} characters`)
		.regex(alphanumericRegex, 'Username must only contain alphanumeric characters')
		.refine(isUsernameAvailable, 'Username is already taken'),
	password: z
		.string()
		.min(4, 'Password must be at least 4 characters long')
		.max(100, 'Password cannot be longer than 100 characters'),
	bestTimeInMs,
});

export type User = z.infer<typeof userSchema>;
