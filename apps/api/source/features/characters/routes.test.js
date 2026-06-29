import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '#root/index.js';

const URL = '/api/v1/characters';

describe('GET /characters', () => {
	it('gets all characters', async () => {
		const { status, body } = await supertest(app).get(URL);

		expect(status).toBe(200);
		expect(body.data).toBeDefined();
	});
});

describe('GET /characters/is-character', () => {
	it.for`
		case            | name          | position
		${'empty'}      | ${null}       | ${null}
		${'incomplete'} | ${'john_doe'} | ${null}
		${'invalid'}    | ${'123'}      | ${'john_doe'}
	`('rejects requests with $case query parameters', async ({ name, position }) => {
		const { status } = await supertest(app).get(`${URL}/name/${name}/position/${position}`);
		expect(status).toBe(400);
	});

	it("gets the confirmation of the character's existence", async () => {
		const { status, body } = await supertest(app).get(`${URL}/name/john_doe/position/1,1`);

		expect(status).toBe(200);
		expect(body.data).toBeTypeOf('boolean');
	});
});
