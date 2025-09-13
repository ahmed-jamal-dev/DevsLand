import { Post, User } from '@types';

//Post APIs
export type CreatePostRequest = Pick<Post, 'Title' | 'UserId' | 'Url'>;
export interface CreatePostResponse {}

export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[];
}

export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post;
}

//User APIs

//signup
export type singUpRequest = Pick<User, 'Email' | 'password'| 'FirstName' | 'LastName'|'userName'>;
export interface singUpResponse {}

//signin
export type signInRequest = { 
    login: string; // userName or email
    password: string;
 };
 
export type signInResponse = Pick<User, 'Email' | 'Id' | 'FirstName' | 'LastName'|'userName'>;