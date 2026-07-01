import { sql } from 'drizzle-orm';

import { characters } from '#root/database/schema.js';
import { database } from '#root/libraries/database.js';

export const findMany = async () => await database.select().from(characters).orderBy(characters.id);

export const isCharacter = async ({ name, position }) => {
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
