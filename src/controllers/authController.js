import bcrypt from 'bcrypt';
import { loginService } from '../services/authService.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) {
      return res
        .status(400)
        .send({ message: 'Password invalid or User no found' });
    }

    const passIsValid = await bcrypt.compare(password, user.password);

    if (!passIsValid) {
      return res
        .status(400)
        .send({ message: 'User no found or Password invalid' });
    }
    // console.log('Password é :: ', passIsValid);
    res.send({ message: 'Login taoKey' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
  // const isValid = await res.send({ message: 'Login TaoKey' });
};
