import {
  createNewsService,
  findAllNewsService,
} from '../services/newsService.js';

export const createNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    if (!title || !text || !banner) {
      res.status(400).send({ message: 'All fields is required' });
    }

    await createNewsService({
      title,
      text,
      banner,
      id: 'test',
      likes: [],
      comments: [],
    });

    res.status(201).send({ message: 'News created' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getAllNews = (req, res) => {
  res.status(200).send({ message: 'All the news registred' });
};
