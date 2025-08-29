import { UesrDao } from './UserDao.js';
import { PostDao } from './PostDao.js';
import { LikesDao } from './LikesDao.js';
import { CommentDao } from './CommentDao.js';
import { InMemoryDataStore } from '../datastore/memorydb/index.js';
export interface DataStore extends UesrDao, PostDao, LikesDao, CommentDao {}

export const db = new InMemoryDataStore();
