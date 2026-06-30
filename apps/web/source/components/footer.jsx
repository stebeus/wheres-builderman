import { ExternalLink } from './ui/external-link.jsx';

export const Footer = () => (
	<footer>
		<p>
			© Stebeus 2026.{' '}
			<ExternalLink to="https://opensource.org/license/mit">MIT License</ExternalLink>
		</p>
		<ExternalLink to="https://github.com/stebeus">GitHub</ExternalLink>
	</footer>
);
