import { Router } from 'express';
import {
  createNews,
  getAllNews,
  topNews,
  findByIdNews,
  findNewsBySearch,
  byUser,
} from '../controllers/newsController.js';
import { authMeddle } from '../middlewares/authMeddle.js';

export const route = Router();

route.post('/', authMeddle, createNews);
route.get('/', getAllNews);
route.get('/top', topNews);
route.get('/search', findNewsBySearch);
route.get('/byuser', authMeddle, byUser);

route.get('/:id', authMeddle, findByIdNews);
