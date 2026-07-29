import { describe, expect, it } from 'vitest';

import { HttpError, isHttpError } from './errors.js';

describe('isHttpError', () => {
	it('confirms that it is not an HTTP error', () => {
		expect(isHttpError(new Error())).toBeFalsy();
	});

	it('confirms that it is an HTTP error', () => {
		expect(isHttpError(new HttpError())).toBeTruthy();
	});
});
