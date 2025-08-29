import { Likes } from "../src/types.js";
export interface LikesDao {
createLike(like : Likes) : void;
}