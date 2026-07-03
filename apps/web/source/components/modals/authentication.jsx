import { useState } from 'react';

import { createField, FieldErrors, getFieldErrors, Input } from '#root/components/forms/index.js';
import { createSubmitButton } from '#root/components/ui/index.js';
import { useForm } from '#root/hooks/form.js';
import { formatSeconds } from '#root/utilities/formatters.js';

const fields = [
	{
		label: 'Username',
		children: (
			<Input
				name="username"
				autoComplete="username"
				pattern="\w+"
				placeholder="john_doe123"
				maxLength={50}
				required
			/>
		),
	},
	{
		label: 'Password',
		children: (
			<Input name="password" autoComplete="new-password" minLength={4} maxLength={100} required />
		),
	},
];

const submitButtons = [
	{ endpoint: 'sign-in', children: 'Log in' },
	{ endpoint: 'sign-up', children: 'Register' },
];

const isSignIn = (endpoint) => endpoint === submitButtons[0].endpoint;

export const Authentication = ({ bestTimeInCs, onAction }) => {
	const [endpoint, setEndpoint] = useState('');

	const { error, handleSubmit } = useForm({
		endpoint: `users/${endpoint}`,
		payload: { bestTimeInCs },
		onAction,
	});

	const fieldErrors = error != null && (
		<FieldErrors errors={isSignIn(endpoint) ? error.errors : getFieldErrors(error)} />
	);

	const handleClick = (endpoint) => setEndpoint(endpoint);

	return (
		<form onSubmit={handleSubmit}>
			<h2>New high score!</h2>
			<p>You finished in {formatSeconds(bestTimeInCs)}.</p>
			<p>Log in or register to save your score:</p>
			{fieldErrors}
			{fields.map(createField)}
			{submitButtons.map(createSubmitButton(handleClick))}
		</form>
	);
};
