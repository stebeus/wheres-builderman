import { describe, expect, it } from 'vitest';

import { pluralize } from './formatters.js';

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
