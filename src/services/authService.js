import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginService = (email) =>
  User.findOne({ email }).select('+password');

export const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86000 });
