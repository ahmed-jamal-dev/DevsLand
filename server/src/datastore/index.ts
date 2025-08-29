import { UserDao } from '@/datastore/Dao/UserDao';
import { PostDao } from '@/datastore/Dao/PostDao';
import { LikesDao } from '@/datastore/Dao/LikesDao';
import { CommentDao } from '@/datastore/Dao/CommentDao';
import { InMemoryDataStore } from '@datastore/memorydb';
export interface DataStore extends UserDao, PostDao, LikesDao, CommentDao {}

export const db = new InMemoryDataStore();
