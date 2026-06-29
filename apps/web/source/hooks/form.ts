import type { SubmitEvent } from 'react';
import type { ResponseError } from '#root/types/errors.ts';

import { useState } from 'react';

import { fetchData, isFetchError } from '#root/services/fetch.ts';

export type Form = {
	endpoint: string;
	payload?: Record<string, unknown>;
	method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
	onAction: () => void;
};

export const useForm = ({ endpoint, payload, method = 'POST', onAction }: Form) => {
	const [error, setError] = useState<ResponseError | null>(null);

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.target));
		const newFormData = { ...formData, ...payload };

		try {
			await fetchData(endpoint, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newFormData),
			});

			onAction();
		} catch (error) {
			if (isFetchError(error)) setError(error.res);
		}
	};

	return { error, handleSubmit };
};
