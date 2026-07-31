const createFieldError = (error) => (
	<li
		className="border border-red-300 bg-red-100 px-2 py-1 text-center text-red-800"
		key={crypto.randomUUID()}
	>
		{error}
	</li>
);

export const FieldErrors = ({ errors }) => (
	<ul className="stack gap-1">{errors.map(createFieldError)}</ul>
);

const getFieldError = ({ errors: [error] }) => error;

export const getFieldErrors = ({ properties = {} }) => Object.values(properties).map(getFieldError);
