import { CloseButton, ErrorFallback, Loader } from '#root/components/ui/index.js';
import { useFetch } from '#root/hooks/fetch.js';
import { formatSeconds } from '#root/utilities/formatters.js';

const createScore = ({ id, username, bestTimeInCs }) => (
	<li key={id}>
		{username} {formatSeconds(bestTimeInCs)}
	</li>
);

export const Leaderboard = () => {
	const { data, isLoading, error } = useFetch('users');

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorFallback error={error} />;

	return (
		<>
			<h2>Leaderboard</h2>
			<ol>{data.map(createScore)}</ol>
			<CloseButton commandFor="leaderboard">Close</CloseButton>
		</>
	);
};
