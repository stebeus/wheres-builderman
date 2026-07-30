import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const KEY_LENGTH = 64;

const promisifiedScrypt = promisify(scrypt);

export const hash = async (password: string) => {
	const salt = randomBytes(16).toString('hex');
	const derivedKey = await promisifiedScrypt(password, salt, KEY_LENGTH);
	return `${salt}:${(derivedKey as Buffer).toString('hex')}`;
};

export const compare = async (password: string, hash: string) => {
	const [salt, key] = hash.split(':');

	const buffer = Buffer.from(key, 'hex');
	const derivedKey = await promisifiedScrypt(password, salt, KEY_LENGTH);

	return timingSafeEqual(buffer, derivedKey as Buffer);
};
