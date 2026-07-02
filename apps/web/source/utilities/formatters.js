export const pluralize = (count, noun, { suffix = 's', plural } = {}) => {
	const isSingular = (count) => count === 1;
	const pluralizedNoun = `${noun}${isSingular(count) ? '' : suffix}`;
	return !isSingular(count) && plural != null ? plural : pluralizedNoun;
};

/**
 * Formats to an approximated second, covering the inaccuracy of `setInterval`.
 * @param {number} millisecond Milliseconds
 * @example
 * // Returns 1 second
 * toApproximatedSecond(1000);
 * @example
 * // Returns 1.5 seconds
 * toApproximatedSecond(1500);
 * @returns {string}
 */
export const toApproximatedSecond = (millisecond) => {
	const tickApproximation = 120;
	const second = Math.round(millisecond / tickApproximation);
	return `${second} ${pluralize(second, 'second')}`;
};
