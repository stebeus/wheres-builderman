import { config } from '#root/config.js';

class FetchError extends Error {
	constructor(url, json) {
		super(`Failed to fetch ${url}`);
		this.json = json;
	}
}

export const fetchData = async (endpoint, options) => {
	const url = new URL(endpoint, `${config.VITE_API_URL}/`);

	const res = await fetch(url, options);
	const { error, data } = await res.json();

	if (!res.ok) throw new FetchError(url, error);

	return data;
};
