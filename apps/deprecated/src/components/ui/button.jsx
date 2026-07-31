export const Button = ({ className, type = 'button', children, ...props }) => (
	<button className={className} type={type} {...props}>
		{children}
	</button>
);

export const MainButton = ({ children, ...props }) => (
	<Button className="interactive bg-accent px-3 py-1 font-medium text-base" {...props}>
		{children}
	</Button>
);

export const CloseButton = ({ className, commandFor, onClick, children }) => (
	<Button
		className={className}
		command="close"
		commandfor={`${commandFor}-modal`}
		aria-label="Close"
		onClick={onClick}
	>
		{children}
	</Button>
);

export const GreenCloseButton = ({ children, ...props }) => (
	<CloseButton
		className="interactive rounded-sm border-2 border-dark-green bg-linear-to-b from-2% from-light-green to-98% to-mid-green px-3 py-1 font-medium text-base text-shadow-button text-shadow-dark-green/50 uppercase"
		{...props}
	>
		{children}
	</CloseButton>
);

const SubmitButton = ({ children, onClick }) => (
	<Button
		className="interactive bg-content px-3 py-1 font-medium text-base"
		type="submit"
		onClick={onClick}
	>
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
