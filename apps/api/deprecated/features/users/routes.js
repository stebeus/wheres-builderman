import { Router } from 'express';

import { get, postSignIn, postSignUp } from './handlers.js';

const router = Router();

router.get('/', get);

router.post('/sign-in', postSignIn);
router.post('/sign-up', postSignUp);

export { router as usersRouter };
