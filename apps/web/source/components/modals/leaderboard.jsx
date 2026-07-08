import { useEffect, useState } from 'react';

import {
	Button,
	CloseButton,
	ErrorFallback,
	Loader,
	ModalBody,
	ModalHeading,
} from '#root/components/ui/index.js';
import { useFetch } from '#root/hooks/fetch.js';
import { fetchData } from '#root/services/fetch.js';
import { formatSeconds } from '#root/utilities/formatters.js';

const createUser = ({ id, username, bestTimeInCs }) => (
	<li key={id}>
		<p className="flex justify-between">
			<span>{username}</span>
			<span>{formatSeconds(bestTimeInCs)}</span>
		</p>
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
			<div className="flex items-center justify-between">
				<ModalHeading>Leaderboard</ModalHeading>
				<div className="flex gap-1">
					<Button
						className="interactive border border-content bg-linear-to-b from-2% from-base to-98% to-border text-content"
						onClick={handleClick}
					>
						Reload users
					</Button>
					<CloseButton
						className="interactive border border-red-950 bg-linear-to-b from-2% from-red-600 to-98% to-red-700 text-red-50"
						commandFor="leaderboard"
					>
						Close
					</CloseButton>
				</div>
			</div>
			<ModalBody>
				<ol className="list-decimal pl-4">{users?.map(createUser)}</ol>
			</ModalBody>
		</>
	);
};
