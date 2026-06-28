import { config } from './config.ts';
import { app } from './index.ts';
import { logger } from './libraries/logger.ts';

app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));
