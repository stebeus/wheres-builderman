export const pluralize = (count, noun, { suffix = 's', plural } = {}) => {
	const isSingular = (count) => count === 1;
	const pluralizedNoun = `${noun}${isSingular(count) ? '' : suffix}`;
	return !isSingular(count) && plural != null ? plural : pluralizedNoun;
};
