/** biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: <explanation> */
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
	const [canCount, setCanCount] = useState(true);
	const [position, setPosition] = useState('');
	const [newData, setNewData] = useState([]);

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
		if (!isLoading) {
			setNewData(data.map((datum) => ({ ...datum, wasFound: true })));
			welcomeRef.current.showModal();

			if (!canCount) {
				authenticationRef.current.showModal();
				return;
			}
		}

		if (!newData.filter(({ wasFound }) => !wasFound).length) {
			setCanCount(false);
		}

		const intervalId = setInterval(() => {
			setTime((t) => {
				if (!canCount) {
					clearInterval(intervalId);
				}
				return t < 60 ? t + 1 : t;
			});
		}, 100);

		return () => (canCount ? clearInterval(intervalId) : '');
	}, [isLoading, data, newData, canCount]);

	if (isLoading) return <Loader />;
	if (error != null) return <ErrorFallback error={error} />;

	return (
		<>
			<StrictMode>
				<Navbar />
				<main>
					<p>{time} seconds</p>
					<p>{newData.filter(({ wasFound }) => !wasFound).length} characters remaining</p>
					<GamePicture characters={newData} positionSetter={setPosition} />
					<CharactersPopover characters={newData} position={position} wasFoundSetter={setNewData} />
				</main>
				<Footer />
				{modals.map(createModal)}
			</StrictMode>
			<Modal id="welcome" ref={welcomeRef}>
				<Welcome characters={newData} />
			</Modal>
		</>
	);
};
