import mongoose from 'mongoose';

export const connectDataBase = () => {
  console.log('Conectando no banco de dados');

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((r) => console.log('Conecção estabelecida com sucesso'))
    .catch((err) => console.log('Falha ao conectar no banco de dados'));
};
