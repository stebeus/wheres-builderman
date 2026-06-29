import type * as z from 'zod';

type HttpError = {
	readonly status: number;
	readonly message: string;
};

type ZodErrorProperties = Record<string, unknown>;

type BadRequestError = {
	readonly details: z.core.$ZodErrorTree<ZodErrorProperties, string>;
};

export type ResponseError = HttpError & BadRequestError;
