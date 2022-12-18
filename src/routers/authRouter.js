import { Router } from 'express';
import { loginController } from '../controllers/authController.js';
export const route = Router();

route.post('/', loginController);
