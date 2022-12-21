import e from 'express';
import {
  create as createService,
  findAllService,
  upDateUserService,
} from '../services/userService.js';

export const create = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;
    // console.log(user);
    if (!name || !userName || !email || !password || !avatar || !background) {
      return res
        .status(400)
        .send({ message: 'Fill all areas to send the form' });
    }

    const user = await createService(req.body);
    if (!user) {
      return res.status(400).send({ message: 'Error creating user' });
    }

    res.status(201).send({
      message: 'User created',
      user: { id: user._id, name, userName, email, avatar, background },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await findAllService();
    if (!users || users.length === 0) {
      return res
        .status(400)
        .send({ message: 'There are not users in database' });
    }

    res.status(200).send({ message: 'Sucess! All users in db', users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = req.user; // await findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    res.send({ message: 'The user was successfully found', user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const upDateUser = async (req, res) => {
  try {
    const { name, userName, email, password, avatar, background } = req.body;
    // console.log(user);
    if (!name && !userName && !email && !password && !avatar && !background) {
      return res
        .status(400)
        .send({ message: 'Fill at least one field to send the update' });
    }
    const id = req.id;

    const user = req.user; // await findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    await upDateUserService({
      _id: id,
      name,
      userName,
      email,
      password,
      avatar,
      background,
    });

    res.send({ message: 'User updated with sucess' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
