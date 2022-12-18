import { Router } from 'express';
import { createNews, getAllNews } from '../controllers/newsController.js';

export const route = Router();

route.post('/', createNews);
route.get('/', getAllNews);
