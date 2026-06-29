import type { ResponseError } from '#root/types/errors.ts';

import { useEffect, useState } from 'react';

import { fetchData, isFetchError } from '#root/services/fetch.ts';

export const useFetch = <Data>(endpoint: string) => {
	const [data, setData] = useState<Data | null>(null);
	const [error, setError] = useState<ResponseError | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchData<Data>(endpoint);
				setData(data);
			} catch (error) {
				if (isFetchError(error)) setError(error.res);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [endpoint]);

	return { data, error, isLoading };
};
