import { describe, expect, it } from 'vitest';

import { pluralize, toSecond } from './formatters.js';

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

describe('toSeconds', () => {
	it('formats 100 centiseconds to 1 second', () => {
		expect(toSecond(100)).toBe('1 second');
	});

	it('formats 150 centiseconds to 1 second', () => {
		expect(toSecond(150)).toBe('1 second');
	});

	it('formats 1,000 centiseconds to 10 seconds', () => {
		expect(toSecond(1000)).toBe('10 seconds');
	});
});
