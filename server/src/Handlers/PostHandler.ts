import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from '@api';
import { db } from '@datastore';
import { ExpressHandler, Post } from '@types';
import crypto from 'crypto';
export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
    request,
    response
) => {
    response.send({ posts:await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
    request,
    response
) => {
    if (!request.body.Title || !request.body.UserId || !request.body.Url) {
        return response.sendStatus(400);
    }
    //todo: validate user id from session
    //todo: validate user exists
    //todo: validate url is and title is not empty
    //todo: url is new , otherwise +1 to existing post
    const post: Post = {
        Id: crypto.randomUUID(),
        PostedAt: Date.now(),
        Title: request.body.Title,
        Url: request.body.Url,
        UserId: request.body.UserId,
    };
    await db.createPost(post);
    response.sendStatus(200);
};
