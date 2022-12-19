import {
  createNewsService,
  findAllNewsService,
  countNews,
  topNewsService,
  findByIdNewsService,
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
    const { limit = 5, offset = 0 } = req.query;

    const total = await countNews();
    const nextNews =
      +limit + +offset >= total ? total - +limit : +limit + +offset;

    const news =
      +limit + +offset > total
        ? await findAllNewsService(+limit, 0)
        : await findAllNewsService(+limit, +offset);
    // console.log('nextNews', nextNews);
    const nextUrl = `${req.baseUrl}?limit=${limit}&offset=${nextNews}`;
    console.log('url Nxt', nextUrl);

    const previus = +offset - +limit < 0 ? 0 : +offset - +limit;
    const previusUrl = `${req.baseUrl}?limit=${limit}&offset=${previus}`;
    console.log('url Prev', previusUrl);

    if (!news || news.length === 0) {
      return res
        .status(400)
        .send({ message: 'There are not news in database' });
    }
    res.send({
      message: 'All the news registred',
      limit,
      offset,
      nextUrl,
      previusUrl,
      total,
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();
    console.log('news', news);
    if (!news) {
      return res.status(400).send({ message: 'News not found' });
    }
    res.send({ message: 'Last News add', news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access latest news', error });
  }
};

export const findByIdNews = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);
    const news = await findByIdNewsService(id);
    console.log('news', news);
    if (!news) {
      return res.status(400).send({ message: 'News not found' });
    }
    res.send({ message: 'News find with sucess', news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access latest news', error });
  }
};