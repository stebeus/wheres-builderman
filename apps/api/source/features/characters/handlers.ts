import type { Handler, Request, Response } from 'express';
import type { Character } from './validations.ts';

import { validate } from '#root/middleware/validation.ts';

import { findMany, isCharacter } from './services.ts';
import { characterSchema } from './validations.ts';

export const get: Handler = async (req, res) => res.send({ data: await findMany() });

export const getIsCharacter = [
	validate({ params: characterSchema }),
	async (req: Request<Character>, res: Response) =>
		res.send({ data: await isCharacter(req.params) }),
];
