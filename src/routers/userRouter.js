import express from 'express';
import { soma } from '../controllers/userController.js';

export const route = express.Router();

route.get('/', soma);
