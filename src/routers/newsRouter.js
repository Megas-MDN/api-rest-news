import { Router } from 'express';
import {
  createNews,
  getAllNews,
  topNews,
  findByIdNews,
  findNewsBySearch,
  byUser,
  updateNews,
} from '../controllers/newsController.js';
import { authMeddle } from '../middlewares/authMeddle.js';

export const route = Router();

route.post('/', authMeddle, createNews);
route.get('/', getAllNews);
route.get('/top', topNews);
route.get('/search', findNewsBySearch);
route.get('/byuser', authMeddle, byUser);
route.patch('/:id', authMeddle, updateNews);

route.get('/:id', authMeddle, findByIdNews);
