import { validate } from '#root/middleware/validation.js';

import { findMany, isCharacter } from './services.js';
import { characterSchema } from './validations.js';

export const get = async (req, res) => res.send({ data: await findMany() });

export const getIsCharacter = [
	validate({ query: characterSchema }),
	async (req, res) => res.send({ data: await isCharacter(res.locals.query) }),
];
