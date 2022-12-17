import express from 'express';
import {
  create,
  findAllUsers,
  findById,
  upDateUser,
} from '../controllers/userController.js';
import { validId, validUser } from '../middlewares/globalMeddle.js';

export const route = express.Router();

route.post('/', create);
route.get('/', findAllUsers);
route.get('/:id', validId, validUser, findById);
route.patch('/:id', validId, validUser, upDateUser);
