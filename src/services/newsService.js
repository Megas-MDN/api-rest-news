import { News } from '../models/News.js';

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = (limit, offset) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

export const countNews = () => News.countDocuments();

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate('user');

export const findByIdNewsService = (id) => News.findById(id).populate('user');
