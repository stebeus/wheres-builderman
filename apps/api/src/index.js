import cors from 'cors';
import express from 'express';

import { config } from './config.js';
import { pino } from './libraries/logger.js';
import { handleError, handleNotFoundError } from './middleware/errors.js';
import { apiRouter } from './routes.js';

export const app = express();

app.use(pino);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: config.CLIENT_URL }));

app.use('/api/v1', apiRouter);

app.use(handleNotFoundError);
app.use(handleError);
