import { useEffect, useState } from 'react';

import { Button, CloseButton, ErrorFallback, Loader } from '#root/components/ui/index.js';
import { useFetch } from '#root/hooks/fetch.js';
import { fetchData } from '#root/services/fetch.js';
import { formatSeconds } from '#root/utilities/formatters.js';

const createUser = ({ id, username, bestTimeInCs }) => (
	<li key={id}>
		{username} {formatSeconds(bestTimeInCs)}
	</li>
);

export const Leaderboard = () => {
	const [users, setUsers] = useState([]);
	const { data, isLoading, error } = useFetch('users');

	const handleClick = async () => setUsers(await fetchData('users'));

	useEffect(() => setUsers(data), [data]);

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorFallback error={error} />;

	return (
		<>
			<h2>Leaderboard</h2>
			<ol>{users?.map(createUser)}</ol>
			<Button onClick={handleClick}>Reload users</Button>
			<CloseButton commandFor="leaderboard">Close</CloseButton>
		</>
	);
};
