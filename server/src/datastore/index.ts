import { UserDao } from '@/datastore/Dao/UserDao';
import { PostDao } from '@/datastore/Dao/PostDao';
import { LikesDao } from '@/datastore/Dao/LikesDao';
import { CommentDao } from '@/datastore/Dao/CommentDao';
import { sqlDataStore } from './sql';
import { Post } from '@/types';
export interface DataStore extends UserDao, PostDao, LikesDao, CommentDao {
    getPostByUrl(url: string): Promise<Post | undefined>;
}
export let db : DataStore;
export const Datastore = new sqlDataStore();

export async function initdb() {
db = await new sqlDataStore().openDb();
}