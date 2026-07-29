import { Router } from 'express';

import { get, getIsCharacter } from './handlers.js';

const router = Router();

router.get('/', get);
router.get('/is-character', getIsCharacter);

export { router as charactersRouter };
