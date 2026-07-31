import { GreenCloseButton, ModalBody, ModalHeading } from '#root/components/ui/index.js';
import { config } from '#root/config.js';

export const Welcome = ({ onClose }) => (
	<>
		<ModalHeading>
			Welcome to <em>{config.VITE_APP_NAME}</em>
		</ModalHeading>
		<ModalBody>
			<p>
				Be the quickest player to find all Roblox characters, by clicking on their eyes and then
				selecting their names correctly!
			</p>
			<p>
				You can also press <kbd className="rounded-xs bg-border px-1.25 py-0.25">Tab</kbd> to get to
				each character quickly.
			</p>
			<GreenCloseButton commandFor="welcome" onClick={onClose}>
				Play now
			</GreenCloseButton>
		</ModalBody>
	</>
);
