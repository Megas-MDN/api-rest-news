import express from 'express';
import { create } from '../controllers/userController.js';

export const route = express.Router();

route.post('/', create);
