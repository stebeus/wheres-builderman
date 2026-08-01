import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '#root/app.ts';

const URL = '/api/v1/users';

describe('GET /users', () => {
	it('retrieves users', async () => {
		const res = await app.request(URL);
		const { data } = await res.json();

		expect(res.status).toBe(200);
		expect(data).toBeDefined();
	});
});

const createUser = (username = '', password = '', bestTime = '') =>
	new URLSearchParams({ username, password, bestTime });

const generateUsername = (username = 'john_doe') =>
	`${username}_${Temporal.Now.instant().epochNanoseconds}`;

const generateBestTime = () => {
	const oneDay = 24 * 60 * 60 * 1000;
	const bestTime = Math.random() * oneDay;
	return Math.ceil(bestTime).toString();
};

describe('POST /users/sign-up', () => {
	describe('Given invalid payloads,', () => {
		it.for`
			case            | body
			${'empty'}      | ${null}
			${'incomplete'} | ${createUser('jane_doe', '12345678')}
			${'invalid'}    | ${createUser('jane doe', '12345678', generateBestTime())}
		`('rejects requests with $case bodies', async ({ body }) => {
			const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });
			expect(res.status).toBe(400);
		});

		it('rejects requests with taken usernames', async () => {
			// Arrange
			const body = createUser('john_doe', '12345678', generateBestTime());

			// Act
			const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });

			// Assert
			expect(res.status).toBe(409);
		});
	});

	it('creates a user', async () => {
		// Arrange
		const body = createUser(generateUsername(), '12345678', generateBestTime());

		// Act
		const res = await app.request(`${URL}/sign-up`, { method: 'POST', body });
		const { data } = await res.json();

		// Assert
		expect(res.status).toBe(201);
		expect(data).toBeDefined();
	});
});

describe('POST /users/sign-in', () => {
	beforeEach(async () => {
		try {
			const body = createUser('john_doe', '12345678', generateBestTime());
			await app.request(`${URL}/sign-up`, { method: 'POST', body });
		} catch {}
	});

	describe('Given invalid payloads,', () => {
		it.for`
			case            | body
			${'empty'}      | ${null}
			${'incomplete'} | ${createUser('john_doe', '12345678')}
			${'invalid'}    | ${createUser('john_doe', '12345678', 'best time')}
		`('rejects requests with $case bodies', async ({ body }) => {
			const res = await app.request(`${URL}/sign-in`, { method: 'POST', body });
			expect(res.status).toBe(400);
		});
	});

	describe('Given incorrect credentials,', () => {
		it.for`
			case                     | body
			${'nonexistent users'}   | ${createUser('john_smith', '12345678', generateBestTime())}
			${'incorrect passwords'} | ${createUser('john_doe', 'abcdefgh', generateBestTime())}
		`('forbids $case', async ({ body }) => {
			const res = await app.request(`${URL}/sign-in`, { method: 'POST', body });
			expect(res.status).toBe(401);
		});
	});

	it('signs the user in', async () => {
		// Arrange
		const body = createUser('john_doe', '12345678', generateBestTime());

		// Act
		const res = await app.request(`${URL}/sign-in`, { method: 'POST', body });
		const { data } = await res.json();

		// Assert
		expect(res.status).toBe(201);
		expect(data).toBeDefined();
	});
});
