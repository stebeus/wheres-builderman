import { describe, expect, it } from 'vitest';

import { pluralize, toApproximatedSecond } from './formatters.js';

describe('pluralize', () => {
	describe('Given no options,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'noun')).toBe('noun');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(2, 'noun')).toBe('nouns');
		});
	});

	describe('Given custom suffixes,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'fox', { suffix: 'es' })).toBe('fox');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(0, 'fox', { suffix: 'es' })).toBe('foxes');
		});
	});

	describe('Given custom plurals,', () => {
		it('preserves singulars', () => {
			expect(pluralize(1, 'person', { plural: 'people' })).toBe('person');
		});

		it('pluralizes nouns', () => {
			expect(pluralize(10, 'person', { plural: 'people' })).toBe('people');
		});
	});
});

describe('toApproximatedSecond', () => {
	it('formats 1,000 milliseconds to 1 second', () => {
		expect(toApproximatedSecond(1000)).toBe('1 second');
	});

	it('formats 1,500 milliseconds to 1.5 seconds', () => {
		expect(toApproximatedSecond(1.5 * 1000)).toBe('1.5 seconds');
	});

	it('formats 10,000 milliseconds to 10 seconds', () => {
		expect(toApproximatedSecond(10 * 1000)).toBe('10 seconds');
	});
});
