import { useEffect, useRef, useState } from 'react';

import { Footer, Navbar } from './components/index.js';
import { Authentication, Leaderboard, Success, Welcome } from './components/modals/index.js';
import { createModal } from './components/ui/index.js';
import { useInterval } from './hooks/interval.js';

export const App = () => {
	const welcomeRef = useRef(null);
	const authenticationRef = useRef(null);
	const successRef = useRef(null);

	const [isFirstRender, setIsFirstRender] = useState(true);
	const [canTick, setCanTick] = useState(false);
	const [timer, setTimer] = useState(0);

	const handleWelcomeClose = () => {
		setIsFirstRender(false);
		setCanTick(true);
	};

	const handleAuthenticationAction = () => {
		authenticationRef.current.close();
		successRef.current.showModal();
	};

	const modals = [
		{
			id: 'welcome',
			ref: welcomeRef,
			children: <Welcome onClose={handleWelcomeClose} />,
		},
		{
			id: 'leaderboard',
			children: <Leaderboard />,
		},
		{
			id: 'authentication',
			closedBy: 'none',
			ref: authenticationRef,
			children: <Authentication bestTimeInMs={timer} onAction={handleAuthenticationAction} />,
		},
		{
			id: 'success',
			ref: successRef,
			children: <Success />,
		},
	];

	useEffect(() => {
		if (isFirstRender) welcomeRef.current.showModal();
	}, [isFirstRender]);

	useInterval(() => setTimer(timer + 1), canTick ? 1 : null);

	return (
		<>
			<Navbar />
			<main></main>
			<Footer />
			{modals.map(createModal)}
		</>
	);
};
