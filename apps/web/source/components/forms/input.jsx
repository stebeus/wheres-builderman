export const Input = ({ type = 'text', name, ...props }) => (
	<input className="w-full border-2 border-border p-2" type={type} name={name} {...props} />
);
