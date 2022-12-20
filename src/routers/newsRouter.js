import { Router } from 'express';
import {
  createNews,
  getAllNews,
  topNews,
  findByIdNews,
  findNewsBySearch,
  byUser,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { authMeddle } from '../middlewares/authMeddle.js';

export const route = Router();

route.post('/', authMeddle, createNews);
route.get('/', getAllNews);
route.get('/top', topNews);
route.get('/search', findNewsBySearch);
route.get('/byuser', authMeddle, byUser);
route.patch('/:id', authMeddle, updateNews);
route.delete('/:id', authMeddle, deleteNews);

route.get('/:id', authMeddle, findByIdNews);
