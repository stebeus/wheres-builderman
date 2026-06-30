import { forwardRef } from 'react';

const Modal = forwardRef(({ id, closedBy = 'any', children }, ref) => (
	<dialog id={`${id}-modal`} closedby={closedBy} ref={ref}>
		{children}
	</dialog>
));

export const createModal = ({ id, closedBy, ref, children }) => (
	<Modal id={id} closedBy={closedBy} key={crypto.randomUUID()} ref={ref}>
		{children}
	</Modal>
);
