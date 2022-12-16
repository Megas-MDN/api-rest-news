import express from 'express';
import { route } from './routers/userRouter.js';

const app = express();
const port = process.env.PORT || 3001;

app.use('/soma', route);

// app.get('/', (req, res) => {
//   console.log(req);
//   // res.send(`TaOkey ${'tuff'}`);
//   const teste = `Um doi tres`;
//   res.json({ teste: 'tuff' });
// });

app.listen(port, () => console.log('The Server está ON'));
