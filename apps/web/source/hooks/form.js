import { useState } from 'react';

import { fetchData } from '#root/services/fetch.js';

export const useForm = ({ endpoint, payload, method = 'post', onAction }) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.target));
		const newFormData = { ...formData, ...payload };

		try {
			await fetchData(endpoint, {
				method: method.toUpperCase(),
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newFormData),
			});

			onAction();
		} catch (error) {
			setError(error.json.details);
		}
	};

	return { error, handleSubmit };
};
