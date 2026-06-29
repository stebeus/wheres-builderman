import type { ResponseError } from '#root/types/errors.ts';

import { config } from '#root/config.ts';

class FetchError extends Error {
	readonly res: ResponseError;

	constructor(url: URL, res: ResponseError) {
		super(`Failed to fetch ${url}`);
		this.res = res;
	}
}

export const isFetchError = (error: unknown) => error instanceof FetchError;

export const fetchData = async <Data>(endpoint: string, options?: RequestInit): Promise<Data> => {
	const url = new URL(endpoint, `${config.VITE_API_URL}/`);

	const res = await fetch(url, options);
	const { error, data } = await res.json();

	if (!res.ok) throw new FetchError(url, error);

	return data;
};
