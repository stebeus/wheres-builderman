export const ExternalLink = ({ to, children }) => (
	<a
		className="text-accent underline-offset-2 hover:underline"
		href={to}
		target="_blank"
		rel="noopener noreferrer"
	>
		{children}
	</a>
);
