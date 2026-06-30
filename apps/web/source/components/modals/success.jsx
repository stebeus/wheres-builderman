import { CloseButton } from '#root/components/ui/index.js';

export const Success = () => (
	<>
		<h2>Success!</h2>
		<p>You can now check your score in the leaderboard or restart the game.</p>
		<CloseButton commandFor="success">OK</CloseButton>
	</>
);
