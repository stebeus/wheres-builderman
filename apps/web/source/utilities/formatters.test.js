import { describe, expect, it } from 'vitest';

import { pluralize, toSeconds } from './formatters.js';

describe('pluralize', () => {
	describe('Given no options,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'noun')).toBe('noun');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(2, 'noun')).toBe('nouns');
		});
	});

	describe('Given suffixes,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'fox', { suffix: 'es' })).toBe('fox');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(0, 'fox', { suffix: 'es' })).toBe('foxes');
		});
	});

	describe('Given plurals,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'person', { plural: 'people' })).toBe('person');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(10, 'person', { plural: 'people' })).toBe('people');
		});
	});
});

describe('toSeconds', () => {
	it('formats 1,000 milliseconds to 1 second', () => {
		expect(toSeconds(1000)).toBe('1 second');
	});

	it('formats 10,000 milliseconds to 10 seconds', () => {
		expect(toSeconds(10 * 1000)).toBe('10 seconds');
	});
});
