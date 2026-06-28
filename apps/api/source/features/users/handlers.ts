import type { Handler, Request, Response } from 'express';

import { validate } from '#root/middleware/validation.ts';

import { create, findMany, update } from './services.ts';
import { signInSchema, userSchema } from './validations.ts';

export const get: Handler = async (req, res) => res.send({ data: await findMany() });

export const postSignIn = [
	validate({ body: signInSchema }),
	async (req: Request, res: Response) => res.send({ data: await update(req.body) }),
];

export const postSignUp = [
	validate({ body: userSchema }),
	async (req: Request, res: Response) => res.send({ data: await create(req.body) }),
];
