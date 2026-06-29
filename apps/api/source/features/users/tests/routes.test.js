import supertest from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '#root/index.js';

const URL = '/api/v1/users';

const createData = (username, password, bestTimeInMs) => ({ username, password, bestTimeInMs });

describe('GET /users', () => {
	it('gets all users', async () => {
		const { status, body } = await supertest(app).get(URL);

		expect(status).toBe(200);
		expect(body.data).toBeDefined();
	});
});

describe('POST /users/sign-in', () => {
	it.for`
		case            | data
		${'empty'}      | ${null}
		${'incomplete'} | ${createData('john_doe', '1234')}
		${'invalid'}    | ${createData('john_doe', 'abcd', 1000)}
	`('rejects $case data', async ({ data }) => {
		const { status } = await supertest(app).post(`${URL}/sign-in`).send(data);
		expect(status).toBe(400);
	});

	it('signs the user in', async () => {
		const { status, body } = await supertest(app)
			.post(`${URL}/sign-in`)
			.send(createData('john_doe', '1234', 1000));

		expect(status).toBe(200);
		expect(body.data.id).toBeDefined();
	});
});

describe('POST /users/sign-up', () => {
	it.for`
		case            | data
		${'empty'}      | ${null}
		${'incomplete'} | ${createData('john_doe', '1234')}
		${'invalid'}    | ${createData('john_doe', '123', 1000)}
	`('rejects $case data', async ({ data }) => {
		const { status } = await supertest(app).post(`${URL}/sign-up`).send(data);
		expect(status).toBe(400);
	});

	it('creates an user', async () => {
		// Arrange
		const username = crypto.randomUUID();

		// Act
		const { status, body } = await supertest(app)
			.post(`${URL}/sign-up`)
			.send(createData(username, '1234', 1000));

		// Assert
		expect(status).toBe(200);
		expect(body.data.id).toBeDefined();
	});
});
