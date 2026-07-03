import { ExternalLink } from './ui/external-link.jsx';

export const Footer = () => (
	<footer>
		<ul>
			<li>
				<ExternalLink to="https://github.com/stebeus/wheres-builderman">Source code</ExternalLink>
			</li>
			<li>
				<ExternalLink to="https://github.com/stebeus">GitHub profile</ExternalLink>
			</li>
		</ul>
		<p>
			The game and error pictures were created by, respectively,{' '}
			<ExternalLink to="https://www.reddit.com/user/yellowt3a/">yellowt3a</ExternalLink> and{' '}
			<ExternalLink to="https://www.reddit.com/user/Stormcloak_Guard_/">
				Stormcloak_Guard_
			</ExternalLink>
			.
		</p>
		<p>
			© Stebeus 2026.{' '}
			<ExternalLink to="https://opensource.org/license/mit">MIT License</ExternalLink>
		</p>
	</footer>
);
