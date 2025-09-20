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
    if (!request.body.title || !request.body.userId || !request.body.url) {
        return response.sendStatus(400);
    }
    //todo: validate user id from session
    //todo: validate user exists
    //todo: validate url is and title is not empty
    //todo: url is new , otherwise +1 to existing post
    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: request.body.title,
        url: request.body.url,
        userId: request.body.userId,
    };
    await db.createPost(post);
    response.sendStatus(200);
};
