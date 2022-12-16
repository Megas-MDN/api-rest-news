export const soma = (req, res) => {
  const s = 100 + 12;

  res.send({ soma: s });
};
