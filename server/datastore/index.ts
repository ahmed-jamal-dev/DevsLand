import{UesrDao} from '../datastore/UserDao.js';
import{PostDao} from '../datastore/PostDao.js';    
import{LikesDao} from './LikesDao.js';
import{CommentDao} from '../datastore/CommentDao.js';
import{InMemoryDataStore} from '../datastore/memorydb/index.js';
export interface DataStore extends UesrDao , PostDao , LikesDao , CommentDao {}

export const db = new InMemoryDataStore();