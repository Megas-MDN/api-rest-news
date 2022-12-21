import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };

export const route = Router();

route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerDocument));
