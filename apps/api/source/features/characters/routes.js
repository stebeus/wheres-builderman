import { Router } from 'express';

import { get, getIsCharacter } from './handlers.js';

const router = Router();

router.get('/', get);
router.get('/name/:name/position/:position', getIsCharacter);

export { router as charactersRouter };
