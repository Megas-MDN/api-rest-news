import { Router } from 'express';
import { createNews, getAllNews } from '../controllers/newsController.js';
import { authMeddle } from '../middlewares/authMeddle.js';

export const route = Router();

route.post('/', authMeddle, createNews);
route.get('/', getAllNews);
