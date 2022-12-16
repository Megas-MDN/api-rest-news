import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  console.log(req);
  res.send(`TaOkey ${'tuff'}`);
});

app.listen(port, () => console.log('The Server está ON'));
