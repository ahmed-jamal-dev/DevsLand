import { UserDao } from '@/datastore/Dao/UserDao';
import { PostDao } from '@/datastore/Dao/PostDao';
import { LikesDao } from '@/datastore/Dao/LikesDao';
import { CommentDao } from '@/datastore/Dao/CommentDao';
import { sqlDataStore } from './sql';
// import { InMemoryDataStore } from '@datastore/memorydb';
export interface DataStore extends UserDao, PostDao, LikesDao, CommentDao {}

export let db : DataStore;

export async function initdb() {
//  db = new InMemoryDataStore();
db = await new sqlDataStore().opinDb();
}