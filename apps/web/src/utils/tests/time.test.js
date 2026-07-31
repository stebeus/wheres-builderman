import { describe, expect, it } from 'vitest';

import { getDurationInSeconds, toSeconds } from '#root/utilities/time.js';

describe('toSeconds', () => {
	it('converts 100 centiseconds to 1 second by default', () => {
		expect(toSeconds(100)).toBe(1);
	});

	it('converts 1,000 milliseconds to 1 second', () => {
		expect(toSeconds(1000, { unitsPerSecond: 1000 })).toBe(1);
	});

	it('converts 1,500 milliseconds to 1.5 seconds', () => {
		expect(toSeconds(1500, { unitsPerSecond: 1000 })).toBe(1.5);
	});

	it('rounds 1,500 milliseconds to 1 second', () => {
		expect(toSeconds(1500, { unitsPerSecond: 1000, shouldRound: true })).toBe(1);
	});
});

describe('getDurationInSeconds', () => {
	it('gets the time period of 100 centiseconds', () => {
		expect(getDurationInSeconds(100)).toBe('PT1S');
	});
});
