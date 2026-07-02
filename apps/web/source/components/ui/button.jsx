export const Button = ({ type = 'button', children, ...props }) => (
	<button type={type} {...props}>
		{children}
	</button>
);

export const CloseButton = ({ commandFor, onClick, children }) => (
	<Button command="close" commandfor={`${commandFor}-modal`} aria-label="close" onClick={onClick}>
		{children}
	</Button>
);

const SubmitButton = ({ children, ...props }) => (
	<Button type="submit" {...props}>
		{children}
	</Button>
);

export const createSubmitButton =
	(endpointSetter) =>
	({ endpoint, children }) => (
		<SubmitButton onClick={() => endpointSetter(endpoint)} key={crypto.randomUUID()}>
			{children}
		</SubmitButton>
	);
