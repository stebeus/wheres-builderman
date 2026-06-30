const Field = ({ label, children }) => (
	<label>
		<span>{label}</span>
		{children}
	</label>
);

export const createField = ({ label, children }) => (
	<Field label={label} key={crypto.randomUUID()}>
		{children}
	</Field>
);
