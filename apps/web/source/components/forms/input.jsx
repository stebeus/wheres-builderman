export const Input = ({ type = 'text', name, ...props }) => (
	<input type={type} name={name} {...props} />
);
