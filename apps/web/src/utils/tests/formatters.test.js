import { describe, expect, it } from 'vitest';

import { formatSeconds, pluralize } from '#root/utilities/formatters.js';

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

describe('formatSeconds', () => {
	it('formats 100 centiseconds to 1 second by default', () => {
		expect(formatSeconds(100)).toBe('1 second');
	});

	it('formats 1,000 milliseconds to 1 second', () => {
		expect(formatSeconds(1000, { unitsPerSecond: 1000 })).toBe('1 second');
	});

	it('formats 1,500 milliseconds to 1.5 seconds', () => {
		expect(formatSeconds(1500, { unitsPerSecond: 1000 })).toBe('1.5 seconds');
	});

	it('formats 1,500 milliseconds to a rounded 1 second', () => {
		expect(formatSeconds(1500, { unitsPerSecond: 1000, shouldRound: true })).toBe('1 second');
	});
});
