import { Comment, Post, User } from '@types';

// ---------------- Post APIs ----------------
// Create Post
export type CreatePostRequest = Pick<Post, 'title' | 'userId' | 'url'>;
export interface CreatePostResponse {
  post: Post;
}

// List Posts
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

// Get Post
export interface GetPostRequest {
  id: string;
}
export interface GetPostResponse {
  post: Post;
}

// ---------------- User APIs ----------------
// Signup
export type signUpRequest = Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'userName'>;
export interface signUpResponse {
  user: Omit<User, 'password'>;
  jwt :string;

}

// Signin
export interface signInRequest {
  login: string;   // userName or email
  password: string;
}
export interface signInResponse {
  user: Omit<User, 'password'>;
  jwt:string;
}

// ---------------- Comment APIs ----------------
// Create Comment
export type createCommentRequest = Pick<Comment, 'content' | 'postId' | 'userId'>;
export interface createCommentResponse {
  comment: Comment;
}

// List Comments for a Post
export interface ListCommentRequest {
  postId: string;
}
export interface ListCommentResponse {
  comments: Comment[];
}

// Delete Comment
export interface deleteCommentRequest {
  id: string;
}
export interface deleteCommentResponse {
}
