import express from 'express';
import { connectDataBase } from './database/db.js';
import dotenv from 'dotenv';

import { route } from './routers/userRouter.js';
import { route as routerAuth } from './routers/authRouter.js';
import { route as routerNews } from './routers/newsRouter.js';
import swaggerRoute from './routers/swaggerRoute.cjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectDataBase();
app.use(express.json());
app.use('/user', route);
app.use('/auth', routerAuth);
app.use('/news', routerNews);
app.use('/docs', swaggerRoute);

app.listen(port, () => console.log('The Server ON'));
