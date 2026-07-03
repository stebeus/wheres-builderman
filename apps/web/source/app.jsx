import { useEffect, useRef, useState } from 'react';

import { Footer, Game, Navbar } from './components/index.js';
import { Authentication, Leaderboard, Modal, Success, Welcome } from './components/modals/index.js';
import { useInterval } from './hooks/interval.js';

export const App = () => {
	const welcomeRef = useRef(null);
	const authenticationRef = useRef(null);
	const successRef = useRef(null);

	const [canTick, setCanTick] = useState(false);
	const [timer, setTimer] = useState(0);

	const handleWelcomeClose = () => setCanTick(true);

	const handleAuthenticationAction = () => {
		authenticationRef.current.close();
		successRef.current.showModal();
	};

	useEffect(() => welcomeRef.current.showModal(), []);

	const centisecondDelay = 10;
	useInterval(() => setTimer(timer + 1), canTick ? centisecondDelay : null);

	return (
		<>
			<Navbar />
			<Game
				authenticationRef={authenticationRef}
				timer={timer}
				canTickSetter={setCanTick}
				timerSetter={setTimer}
			/>
			<Footer />
			<Modal id="welcome" closedBy="none" ref={welcomeRef}>
				<Welcome onClose={handleWelcomeClose} />
			</Modal>
			<Modal id="leaderboard">
				<Leaderboard />
			</Modal>
			<Modal id="authentication" closedBy="none" ref={authenticationRef}>
				<Authentication bestTimeInCs={timer} onAction={handleAuthenticationAction} />
			</Modal>
			<Modal id="success" ref={successRef}>
				<Success />
			</Modal>
		</>
	);
};
