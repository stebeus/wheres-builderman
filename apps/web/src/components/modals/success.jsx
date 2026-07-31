import { GreenCloseButton, ModalBody, ModalHeading } from '#root/components/ui/index.js';

export const Success = () => (
	<>
		<ModalHeading>Success!</ModalHeading>
		<ModalBody>
			<p>You can now check your score in the leaderboard or restart the game.</p>
			<GreenCloseButton commandFor="success">OK</GreenCloseButton>
		</ModalBody>
	</>
);
