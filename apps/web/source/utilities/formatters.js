import { toSeconds } from './time.js';

export const pluralize = (count, noun, { suffix = 's', plural } = {}) => {
	const isSingular = (count) => count === 1;
	const pluralizedNoun = `${noun}${isSingular(count) ? '' : suffix}`;
	return !isSingular(count) && plural != null ? plural : pluralizedNoun;
};

export const formatSeconds = (time, { unitsPerSecond, shouldRound } = {}) => {
	const seconds = toSeconds(time, { unitsPerSecond, shouldRound });
	return `${seconds} ${pluralize(seconds, 'second')}`;
};
