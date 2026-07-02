import * as z from 'zod';

import { handleBadRequestError } from './errors.js';

export const validate = (schemas) => async (req, res, next) => {
	const entries = Object.entries(schemas);

	const parseSchema = async ([key, schema]) => {
		const result = await schema.safeParseAsync(req[key]);
		return { key, ...result };
	};

	const results = await Promise.all(entries.map(parseSchema));

	for (const { key, success, error, data } of results) {
		if (!success) {
			const details = z.treeifyError(error);
			return handleBadRequestError(details, req, res, next);
		}

		res.locals[key] = data;
	}

	next();
};
