import { Likes } from '../types.js';
export interface LikesDao {
    createLike(like: Likes): void;
}
