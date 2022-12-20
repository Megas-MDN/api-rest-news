import mongoose from 'mongoose';

export const connectDataBase = () => {
  console.log('Conectando no banco de dados');

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((r) => console.log('Connection established successfully'))
    .catch((err) => console.log('Failed to connect to database'));
};
