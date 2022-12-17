export const create = (req, res) => {
  const { name, userName, email, password, avatar, background } = req.body;
  // console.log(user);
  if (!name || !userName || !email || !password || !avatar || !background) {
    res.status(400).send({ message: 'Fill all areas to send the form' });
  }
  res.status(201).send({
    message: 'User created',
    user: { name, userName, email, avatar, background },
  });
};
