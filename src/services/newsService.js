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
