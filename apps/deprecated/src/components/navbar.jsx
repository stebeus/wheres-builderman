import logo from '#root/assets/logo.svg';

export const Navbar = () => (
	<header>
		<h1>
			<a href="/">
				<svg width="500" height="42" viewBox="0 0 3723 314">
					<title>Where's Builderman?</title>
					<use href={logo} />
				</svg>
			</a>
		</h1>
	</header>
);
