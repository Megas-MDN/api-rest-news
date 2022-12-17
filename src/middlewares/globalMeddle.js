import mongoose from 'mongoose';
import { findByIdService } from '../services/userService.js';

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    const valid = mongoose.Types.ObjectId.isValid(id);

    if (!valid) {
      return res.status(400).send({ message: 'Invalid id' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    req.id = id;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
