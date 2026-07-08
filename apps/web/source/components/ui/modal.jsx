import { forwardRef } from 'react';

export const Modal = forwardRef(({ id, closedBy = 'any', children }, ref) => (
	<dialog
		id={`${id}-modal`}
		className="place-self-center-safe min-w-md bg-accent p-[2px] text-white"
		closedby={closedBy}
		ref={ref}
	>
		{children}
	</dialog>
));

export const ModalHeading = ({ children }) => (
	<h2 className="px-2 py-1 font-bold text-lg">{children}</h2>
);

export const ModalBody = ({ children }) => (
	<div className="stack max-w-[75ch] gap-2 bg-base p-4 text-content">{children}</div>
);
