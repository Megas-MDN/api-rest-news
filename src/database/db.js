import mongoose from 'mongoose';

export const connectDataBase = () => {
  console.log('Conectando wait');

  mongoose
    .connect(
      'mongodb+srv://root:plusultraroot@cluster0.s0jnxcm.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((r) => console.log('Deu tudo certo'))
    .catch((err) => console.log('Deu ruim dmais'));
};
