import { snakeCase } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-orm/zod';
import * as z from 'zod';

export const characters = snakeCase.table('characters', (t) => ({
	id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: t.text().notNull(),
	description: t.text().notNull(),
	position: t.point({ mode: 'xy' }).notNull(),
}));

export type NewCharacter = typeof characters.$inferInsert;

const positionRegex = /[0-9]+,[0-9]+/;

const coercePosition = (value: string) => {
	const [row, column] = value.split(',');
	return { x: Number(column), y: Number(row) };
};

export const getCharactersParamsSchema = createSelectSchema(characters, {
	position: z
		.string()
		.regex(positionRegex, 'Position must be formatted as "row,column"')
		.transform(coercePosition),
}).omit({ id: true, description: true });

export type GetCharactersParams = z.infer<typeof getCharactersParamsSchema>;
