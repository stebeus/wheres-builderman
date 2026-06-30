export const pluralize = (count, noun, { suffix = 's', plural } = {}) => {
	const isSingular = (count) => count === 1;
	const pluralizedNoun = `${noun}${isSingular(count) ? '' : suffix}`;
	return !isSingular(count) && plural != null ? plural : pluralizedNoun;
};

export const toSeconds = (milliseconds) => {
	const oneSecond = 1000;
	const second = milliseconds / oneSecond;
	return `${second} ${pluralize(second, 'second')}`;
};
