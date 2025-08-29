import { UserDao } from './UserDao';
import { PostDao } from './PostDao';
import { LikesDao } from './LikesDao';
import { CommentDao } from './CommentDao';
import { InMemoryDataStore } from '@datastore/memorydb';
export interface DataStore extends UserDao, PostDao, LikesDao, CommentDao {}

export const db = new InMemoryDataStore();
