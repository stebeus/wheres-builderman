import { useEffect, useRef, useState } from 'react';

import { Footer, GamePicture, Navbar } from './components/index.js';
import { Authentication, Leaderboard, Success, Welcome } from './components/modals/index.js';
import { createModal, ListPopover } from './components/ui/index.js';

export const App = () => {
	const welcomeRef = useRef(null);
	const authenticationRef = useRef(null);
	const successRef = useRef(null);

	const [time, setTime] = useState(0);

	const handleAction = () => {
		authenticationRef.current.close();
		successRef.current.showModal();
	};

	const modals = [
		{
			id: 'welcome',
			ref: welcomeRef,
			children: <Welcome />,
		},
		{
			id: 'leaderboard',
			children: <Leaderboard />,
		},
		{
			id: 'authentication',
			closedBy: 'none',
			ref: authenticationRef,
			children: <Authentication time={time} onAction={handleAction} />,
		},
		{
			id: 'success',
			ref: successRef,
			children: <Success />,
		},
	];

	useEffect(() => welcomeRef.current.showModal());

	return (
		<>
			<Navbar />
			<main>
				<button popoverTarget="list-popover">open p</button>
				<ListPopover items={['hi', 'bye']} />
				<GamePicture />
			</main>
			<Footer />
			{modals.map(createModal)}
		</>
	);
};
