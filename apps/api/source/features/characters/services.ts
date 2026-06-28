import type { Character } from './validations.ts';

import { sql } from 'drizzle-orm';

import { characters } from '#root/database/schema.ts';
import { database } from '#root/libraries/database.ts';

export const findMany = async () => await database.select().from(characters);

export const isCharacter = async ({ name, position }: Character) => {
	const [row, column] = position.split(',');

	const query = sql`
    SELECT EXISTS (
      SELECT 1
      FROM ${characters}
      WHERE ${characters.name} = ${name}
        AND ${characters.position} ~= point(${row}, ${column})
    )
  `;

	const [{ exists }] = await database.execute(query);

	return exists;
};
