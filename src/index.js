import express from 'express';
import { connectDataBase } from './database/db.js';
import dotenv from 'dotenv';

import { route } from './routers/userRouter.js';
import { route as routerAuth } from './routers/authRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDataBase();
app.use(express.json());
app.use('/user', route);
app.use('/auth', routerAuth);

// app.get('/', (req, res) => {
//   console.log(req);
//   // res.send(`TaOkey ${'tuff'}`);
//   const teste = `Um doi tres`;
//   res.json({ teste: 'tuff' });
// });

app.listen(port, () => console.log('The Server está ON'));
