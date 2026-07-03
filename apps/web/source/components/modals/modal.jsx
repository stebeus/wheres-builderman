import { forwardRef } from 'react';

export const Modal = forwardRef(({ id, closedBy = 'any', children }, ref) => (
	<dialog id={`${id}-modal`} closedby={closedBy} ref={ref}>
		{children}
	</dialog>
));
