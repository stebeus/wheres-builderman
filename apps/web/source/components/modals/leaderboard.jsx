import { CloseButton, ErrorFallback, Loader } from '#root/components/ui/index.js';
import { useFetch } from '#root/hooks/fetch.js';

const createScore = ({ id, username, bestTimeInMs }) => (
	<li key={id}>
		{username} {bestTimeInMs}
	</li>
);

export const Leaderboard = () => {
	const { isLoading, error, data } = useFetch('users');

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
