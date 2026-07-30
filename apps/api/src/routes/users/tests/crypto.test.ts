import { describe, expect, it } from 'vitest';

import { compare, hash } from '#root/routes/users/crypto.ts';

describe('compare', () => {
	it('confirms that the password mismatches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Correct password');

		// Act
		const isMatch = await compare('Incorrect password', passwordHash);

		// Assert
		expect(isMatch).toBeFalsy();
	});

	it('confirms that the password matches the hash', async () => {
		// Arrange
		const passwordHash = await hash('Correct password');

		// Act
		const isMatch = await compare('Correct password', passwordHash);

		// Assert
		expect(isMatch).toBeTruthy();
	});
});
