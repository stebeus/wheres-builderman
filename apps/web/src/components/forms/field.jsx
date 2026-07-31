const Field = ({ label, children }) => (
	<label className="stack items-center">
		<span className="font-medium">{label}</span>
		{children}
	</label>
);

export const createField = ({ label, children }) => (
	<Field label={label} key={crypto.randomUUID()}>
		{children}
	</Field>
);
