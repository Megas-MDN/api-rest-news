import { User } from '../models/User.js';

export const loginService = (email) =>
  User.findOne({ email }).select('+password');
