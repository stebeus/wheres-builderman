import { integer, pgTable, point, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: varchar({ length: 50 }).notNull().unique(),
	password: text().notNull(),
	bestTimeInMs: integer().notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow(),
	updatedAt: timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const characters = pgTable('characters', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	description: text().notNull(),
	position: point().notNull(),
});
