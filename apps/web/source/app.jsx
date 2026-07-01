import { StrictMode, useEffect, useRef, useState } from 'react';

import { CharactersPopover, Footer, GamePicture, Navbar } from './components/index.js';
import {
	Authentication,
	createModal,
	Leaderboard,
	Modal,
	Success,
	Welcome,
} from './components/modals/index.js';
import { ErrorFallback, Loader } from './components/ui/index.js';
import { useFetch } from './hooks/fetch.js';

export const App = () => {
	const authenticationRef = useRef(null);
	const successRef = useRef(null);
	const welcomeRef = useRef(null);

	const [time, setTime] = useState(0);
	const [position, setPosition] = useState('');

	const { isLoading, error, data = [] } = useFetch('characters');

	const handleAction = () => {
		authenticationRef.current.close();
		successRef.current.showModal();
	};

	const modals = [
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

	useEffect(() => {
		if (!isLoading) welcomeRef.current.showModal();
	}, [isLoading]);

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorFallback error={error} />;

	return (
		<>
			<StrictMode>
				<Navbar />
				<main>
					<GamePicture characters={data} positionSetter={setPosition} />
					<CharactersPopover characters={data} position={position} />
				</main>
				<Footer />
				{modals.map(createModal)}
			</StrictMode>
			<Modal id="welcome" ref={welcomeRef}>
				<Welcome characters={data} />
			</Modal>
		</>
	);
};
