import mongoose from 'mongoose';

export const connectDataBase = () => {
  console.log('Conectando wait');

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((r) => console.log('Deu tudo certo'))
    .catch((err) => console.log('Deu ruim dmais'));
};
