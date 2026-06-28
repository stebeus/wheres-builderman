import { Router } from 'express';

import { charactersRouter } from './features/characters/routes.ts';
import { usersRouter } from './features/users/routes.ts';

const router = Router();

router.use('/characters', charactersRouter);
router.use('/users', usersRouter);

export { router as apiRouter };
