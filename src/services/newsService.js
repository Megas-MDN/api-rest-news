import { News } from '../models/News.js';

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

export const countNews = () => News.countDocuments();

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate('user');

export const findByIdNewsService = (id) => News.findById(id).populate('user');

export const findNewsBySearchService = (title) =>
  News.find({
    title: { $regex: `${title || ''}`, $options: 'i' },
  })
    .sort({ _id: -1 })
    .populate('user');

export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate('user');

export const updateNewsService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

export const deleteNewsService = (id) => News.findByIdAndDelete({ _id: id });

export const likeNewsService = (id, userId) =>
  News.findOneAndUpdate(
    { _id: id, 'likes.userId': { $nin: [userId] } },
    {
      $push: { likes: { userId, createAt: new Date() } },
    }
  );

export const deleteLikeNewsService = (id, userId) =>
  News.findByIdAndUpdate({ _id: id }, { $pull: { likes: { userId } } });

export const commentNewsService = (id, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        comments: {
          id: idComment,
          userId,
          comment,
          createAt: new Date(),
        },
      },
    }
  );
};

export const deleteCommentNewsService = (idNews, idComment, userId) =>
  News.findByIdAndUpdate(
    { _id: idNews },
    {
      $pull: { comments: { id: idComment, userId } },
    }
  );
