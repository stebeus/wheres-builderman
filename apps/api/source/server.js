import { config } from './config.js';
import { app } from './index.js';
import { logger } from './libraries/logger.js';

app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));
