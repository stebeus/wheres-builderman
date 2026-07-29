import * as z from 'zod';

const positionRegex = /[0-9]+,[0-9]+/;

export const characterSchema = z.object({
	name: z.string(),
	position: z.string().regex(positionRegex, 'Position must follow the "row,column" format'),
});
