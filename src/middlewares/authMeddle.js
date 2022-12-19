import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findByIdService } from '../services/userService.js';

dotenv.config();

export const authMeddle = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .send({ message: 'This user is not allower to post' });
    }

    const [schema, token] = authorization.split(' ');
    if (schema !== 'Bearer' || !token) {
      return res
        .status(401)
        .send({ message: 'This user is not allower to post, bad token' });
    }

    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      return res.status(400).send({ message: 'All fields is required' });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      console.log(error);
      console.log('decoded', decoded);
      if (error) {
        return res
          .status(401)
          .send({ message: 'This user is not allower to post, token invalid' });
      } else {
        const user = await findByIdService(decoded.id);
        if (!user) {
          return res.status(401).send({ message: 'This user does not exist' });
        } else {
          req.userId = decoded.id;
          next();
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
