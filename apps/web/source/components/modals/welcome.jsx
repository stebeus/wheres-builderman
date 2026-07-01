import { CloseButton } from '#root/components/ui/index.js';
import { config } from '#root/config.js';

export const Welcome = ({ characters }) => (
	<>
		<h2>
			Welcome to <em>{config.VITE_APP_NAME}</em>
		</h2>
		<p>
			Be the quickest player to find all {characters.length} Roblox characters, by clicking on their
			eyes and then selecting their names correctly!
		</p>
		<p>
			You can also press <kbd>Tab</kbd> to get to each character quickly.
		</p>
		<CloseButton commandFor="welcome">Play now</CloseButton>
	</>
);
