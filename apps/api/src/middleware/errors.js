import { BadRequestError, HttpError, isHttpError, notFoundError } from '#root/utilities/errors.js';

export const handleBadRequestError = (error, req, res, next) => next(new BadRequestError(error));

export const handleNotFoundError = (req, res, next) => next(notFoundError);

export const handleError = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const httpError = isHttpError(error) ? error : new HttpError();

	if (!isHttpError(error)) req.log.error(error);

	res.status(httpError.status).send({ error: httpError });
};
