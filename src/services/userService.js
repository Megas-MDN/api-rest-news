import { User } from '../models/User.js';

export const create = (body) => User.create(body);

export const findAllService = () => User.find();

export const findByIdService = (id) => User.findById(id);

export const upDateUserService = ({
  _id,
  name,
  userName,
  email,
  password,
  avatar,
  background,
}) =>
  User.findOneAndUpdate(
    { _id },
    {
      name,
      userName,
      email,
      password,
      avatar,
      background,
    }
  );
