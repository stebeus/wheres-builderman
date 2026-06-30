import { config } from '#root/config.js';

export const Navbar = () => (
	<header>
		<h1 title="Homepage">
			<a href="/">{config.VITE_APP_NAME}</a>
		</h1>
	</header>
);
