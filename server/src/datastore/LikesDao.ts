import { Likes } from '@types';

export interface LikesDao {
    createLike(like: Likes): void;
}
