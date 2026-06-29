import { validate } from '#root/middleware/validation.js';

import { findMany, isCharacter } from './services.js';
import { characterSchema } from './validations.js';

export const get = async (req, res) => res.send({ data: await findMany() });

export const getIsCharacter = [
	validate({ params: characterSchema }),
	async (req, res) => res.send({ data: await isCharacter(req.params) }),
];
