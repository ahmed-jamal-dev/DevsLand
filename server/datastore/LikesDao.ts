import { Likes } from "../src/types";
export interface LikesDao {
createLike(like : Likes) : void;
}