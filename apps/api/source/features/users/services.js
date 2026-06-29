import { eq } from 'drizzle-orm';

import { users } from '#root/database/schema.js';
import { database } from '#root/libraries/database.js';

import { compare, hash } from './crypto.js';

export const create = async ({ username, password, bestTimeInMs }) => {
	const hashedPassword = await hash(password);

	const [user] = await database
		.insert(users)
		.values({ username, password: hashedPassword, bestTimeInMs })
		.returning();

	return user;
};

export const findMany = async () => await database.select().from(users).orderBy(users.bestTimeInMs);

export const findFirst = async (username) => {
	const [user] = await database.select().from(users).where(eq(users.username, username)).limit(1);
	return user;
};

export const authenticate = async ({ username, password }) => {
	const user = await findFirst(username);
	if (user == null) return false;

	const isMatch = await compare(password, user.password);
	return isMatch;
};

export const isUsernameAvailable = async (username) => (await findFirst(username)) == null;

export const update = async ({ username, bestTimeInMs }) => {
	const [user] = await database
		.update(users)
		.set({ bestTimeInMs })
		.where(eq(users.username, username))
		.returning();

	return user;
};
