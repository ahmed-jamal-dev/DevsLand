import { Comment, Post, User } from '@types';
//Post APIs
// Create Post
export type CreatePostRequest = Pick<Post, 'Title' | 'UserId' | 'Url'>;
export interface CreatePostResponse {}
// List Posts
export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[];
}

// Get Post
export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post;
}

//User APIs
//signup
export type singUpRequest = Pick<User,'Email' | 'password'| 'FirstName' | 'LastName'|'userName'>;
export interface singUpResponse {}

//signin
export type signInRequest = { 
    login: string; // userName or email
    password: string;
 };
export type signInResponse = Pick<User, 'Email' | 'Id' | 'FirstName' | 'LastName'|'userName'>;

//Comment APIs
// Create comment 
export type createCommentRequest = Pick<Comment,'Comment' | 'PostId'|'UserId'>;
export interface createCommentResponse {
    comment : Comment;
    massage : string;
}

// List Comment for a post
export interface ListCommentRequest {
    postId: string;
        massage : string;
}
export interface ListCommentResponse {
    Comment: Comment[];
        massage : string;

}

// Delete comment 

export interface deleteCommentRequest{
    id : string;
}
export interface deleteCommentResponse {
    message: string;
}