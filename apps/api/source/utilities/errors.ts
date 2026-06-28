import { STATUS_CODES } from 'node:http';
import { constants } from 'node:http2';

const { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } =
	constants;

export class HttpError extends Error {
	readonly status: number;

	constructor(status = HTTP_STATUS_INTERNAL_SERVER_ERROR, message = STATUS_CODES[status]) {
		super(message);
		this.status = status;
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON() {
		const rest = this as Omit<this, 'name' | 'message' | 'stack'>;
		return { message: this.message, ...rest };
	}
}

export class BadRequestError extends HttpError {
	readonly details: object;

	constructor(details: object) {
		super(HTTP_STATUS_BAD_REQUEST);
		this.details = details;
	}
}

export const notFoundError = new HttpError(HTTP_STATUS_NOT_FOUND);

export const isErrnoException = (error: unknown): error is NodeJS.ErrnoException =>
	error instanceof Error;

export const isHttpError = (error: Error) => error instanceof HttpError;
