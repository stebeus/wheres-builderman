import { useEffect, useRef } from 'react';

export const useInterval = (handler, delay = 1000) => {
	const handlerRef = useRef(null);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const tick = () => handlerRef.current();

		if (delay != null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};
