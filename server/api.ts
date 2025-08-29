import { Post } from "../server/src/types.js";

//Post APIs
export type CreatePostRequest = Pick<Post,"Title"|"UserId"|"Url">; 
export interface CreatePostResponse {}

export interface ListPostsRequest {}
export interface ListPostsResponse { posts: Post[]; } 

export interface GetPostRequest {}
export interface GetPostResponse { post: Post; }

//User APIs
export interface CreateUserRequest { Name: string; }
export interface CreateUserResponse { Id: string; }