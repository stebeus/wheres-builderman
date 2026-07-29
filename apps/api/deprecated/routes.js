import { Router } from 'express';

import { charactersRouter } from './features/characters/routes.js';
import { usersRouter } from './features/users/routes.js';

const router = Router();

router.use('/characters', charactersRouter);
router.use('/users', usersRouter);

export { router as apiRouter };
