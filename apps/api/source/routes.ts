import { Router } from 'express';

import { usersRouter } from './features/users/routes.js';

const router = Router();

router.use('/users', usersRouter);

export { router as apiRouter };
