import {
  createNewsService,
  findAllNewsService,
  countNews,
  topNewsService,
  findByIdNewsService,
  findNewsBySearchService,
  byUserService,
  updateNewsService,
  deleteNewsService,
  likeNewsService,
  deleteLikeNewsService,
  commentNewsService,
  deleteCommentNewsService,
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

    const previus = +offset - +limit < 0 ? 0 : +offset - +limit;
    const previusUrl = `${req.baseUrl}?limit=${limit}&offset=${previus}`;

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

    const news = await findByIdNewsService(id);

    if (!news) {
      return res.status(400).send({ message: 'News not found' });
    }
    res.send({ message: 'News find with sucess', news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access latest news', error });
  }
};

export const findNewsBySearch = async (req, res) => {
  try {
    const { search } = req.query;

    const news = await findNewsBySearchService(search);
    if (!news) {
      return res.status(400).send({ message: 'No news found' });
    }
    res.send({ message: 'News find with sucess', news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access news', error });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);
    if (!news) {
      return res
        .status(400)
        .send({ message: 'No news from this user was founded' });
    }
    res.send({ message: 'News find with sucess', news });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: 'Unable to access  news from this user', error });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      return res.status(400).send({ message: 'All fields is required' });
    }

    const news = await findByIdNewsService(id);
    // console.log('ids', news.user._id.toString() === req.userId);
    if (news.user._id.toString() !== req.userId) {
      return res
        .status(400)
        .send({ message: "You don't have permission to edit this post." });
    }

    await updateNewsService(id, title, text, banner);
    res.send({ message: 'Your post has been successfully updated.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access news', error });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdNewsService(id);
    if (news.user._id.toString() !== req.userId) {
      return res
        .status(400)
        .send({ message: 'You do not have permission to delete this post.' });
    }

    await deleteNewsService(id);
    res.send({ message: 'Your post has been deleted with successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to access news', error });
  }
};

export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await likeNewsService(id, req.userId);

    if (!response) {
      await deleteLikeNewsService(id, req.userId);
      return res.send({ message: 'You unlike this post' });
    }
    res.send({ message: 'Like', response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to like this news', error });
  }
};

export const commentNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: 'You have send a comment.' });
    }
    await commentNewsService(id, comment, req.userId);
    res.send({ message: 'You commented this post' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to cooment this news', error });
  }
};

export const deleteCommentNews = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;

    const response = await deleteCommentNewsService(
      idNews,
      idComment,
      req.userId
    );
    const comment = response.comments.find((el) => el.id === idComment);
    if (!comment || comment?.userId !== req.userId) {
      return res
        .status(400)
        .send({ message: "You can't remover this comment." });
    }
    res.send({ message: 'You comment has been deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Unable to delete this comment', error });
  }
};
