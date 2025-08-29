import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '@api';
import { db } from '@datastore';
import { ExpressHandler, Post } from '@types';
import crypto from 'crypto';
export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = (
    request,
    response
) => {
    response.send({ posts: db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = (
    request,
    response
) => {
    // Validate the request body
    if (!request.body.Title) {
        return response.sendStatus(400).send('Title is required');
    }
    if (!request.body.Title || !request.body.UserId || !request.body.Url) {
        return response.sendStatus(400);
    }
    const post: Post = {
        Id: crypto.randomUUID(),
        PostAt: Date.now(),
        Title: request.body.Title,
        Url: request.body.Url,
        UserId: request.body.UserId,
    };
    db.createPost(post);
    response.sendStatus(200);
};
