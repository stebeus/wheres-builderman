import type { ErrorRequestHandler, Handler } from 'express';

import { BadRequestError, HttpError, isHttpError, notFoundError } from '#root/utilities/errors.ts';

export const handleBadRequestError: ErrorRequestHandler = (error, req, res, next) =>
	next(new BadRequestError(error));

export const handleNotFoundError: Handler = (req, res, next) => next(notFoundError);

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const httpError = isHttpError(error) ? error : new HttpError();

	if (!isHttpError(error)) req.log.error(error);

	res.status(httpError.status).send({ error: httpError });
};
