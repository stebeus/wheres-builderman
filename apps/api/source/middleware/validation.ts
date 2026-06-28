import type { Handler } from 'express';

import * as z from 'zod';

import { handleBadRequestError } from './errors.ts';

type Schemas = {
	body?: z.ZodObject;
	headers?: z.ZodObject;
	params?: z.ZodObject;
	query?: z.ZodObject;
};

type Validator = (schemas: Schemas) => Handler;

type SchemaEntry = [keyof Schemas, z.ZodObject];

export const validate: Validator = (schemas) => async (req, res, next) => {
	const entries = Object.entries(schemas) as SchemaEntry[];

	const parseSchema = async ([key, schema]: SchemaEntry) => {
		const result = await schema.safeParseAsync(req[key]);
		return { key, ...result };
	};

	const results = await Promise.all(entries.map(parseSchema));

	for (const { key, success, error, data } of results) {
		if (!success) {
			const details = z.treeifyError(error);
			return handleBadRequestError(details, req, res, next);
		}

		req[key] = data;
	}

	next();
};
