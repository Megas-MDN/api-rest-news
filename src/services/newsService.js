import { News } from '../models/News.js';

export const createNewsService = (body) => News.create(body);

export const findAllNewsService = () => News.find();
