import { useEffect, useState } from 'react';

import { fetchData } from '#root/services/fetch.js';

export const useFetch = (endpoint) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchData(endpoint);
				setData(data);
			} catch (error) {
				setError(error.json);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [endpoint]);

	return { data, error, isLoading };
};
