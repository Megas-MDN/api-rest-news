import {
  createNewsService,
  findAllNewsService,
} from '../services/newsService.js';

export const createNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      return res.status(400).send({ message: 'All fields is required' });
    }

    await createNewsService({
      title,
      text,
      banner,
      user: { _id: req.userId },
      likes: [],
      comments: [],
    });

    res.status(201).send({ message: 'News created' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await findAllNewsService();
    if (!news || news.length === 0) {
      return res
        .status(400)
        .send({ message: 'There are not news in database' });
    }
    res.send({ message: 'All the news registred', news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
