export const toSeconds = (time, { unitsPerSecond = 100, shouldRound } = {}) => {
	const seconds = time / unitsPerSecond;
	return shouldRound ? Math.floor(seconds) : seconds;
};

export const getDurationInSeconds = (time) =>
	Temporal.Duration.from({ seconds: toSeconds(time, { shouldRound: true }) }).toString();
