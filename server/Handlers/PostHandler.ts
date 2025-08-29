import { db } from "../datastore/index.js";
import { ExpressHandler, Post } from "../src/types.js";
import crypto from 'crypto'


export const listPostHandler: ExpressHandler<{}, {}> = (request, response) => {
  response.send({ posts: db.listPosts() });
};
type CreatePostRequest = Pick<Post,"Title"|"UserId"|"Url">; 

export interface CreatePostResponse {}

export const createPostHandler: ExpressHandler<CreatePostRequest,CreatePostResponse> = (request, response) => {
  if (!request.body.Title || !request.body.UserId|| !request.body.Url) {
    return response.sendStatus(400);
  }
    const post : Post = {
        Id: crypto.randomUUID(),
        PostAt: Date.now(),
        Title:request.body.Title,
        Url:request.body.Url,
        UserId:request.body.UserId,
    };
  db.createPost(post);
  response.sendStatus(200);
};
