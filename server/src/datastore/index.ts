import { UserDao } from '@/datastore/Dao/UserDao';
import { PostDao } from '@/datastore/Dao/PostDao';
import { LikesDao } from '@/datastore/Dao/LikesDao';
import { CommentDao } from '@/datastore/Dao/CommentDao';
import { sqlDataStore } from './sql';
export interface DataStore extends UserDao, PostDao, LikesDao, CommentDao {}

export let db : DataStore;

export async function initdb() {
db = await new sqlDataStore().opinDb();
}