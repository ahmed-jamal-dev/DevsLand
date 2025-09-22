import { ExpressHandler } from '@/types';
import {
    createLikeRequest,
    createLikeResponse,
    deleteLikeRequest,
    deleteLikeResponse,
    listLikeRequest,
    listLikeResponse,
    Likes,
} from '@/api';
import { Datastore } from '@/datastore';
// ---------------- Create Like ----------------
export const createLikeHandler: ExpressHandler<createLikeRequest, createLikeResponse> = async (
    req,
    res
) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
        return res.status(400).send({ message: 'postId and userId are required' });
    }

    const alreadyLiked = await Datastore.userLiked(userId, postId);
    if (alreadyLiked) {
        return res.status(400).send({ message: 'User already liked this post' });
    }

    const like: Likes = {
        postId,
        userId,
    };

    await Datastore.createLike(like);
    res.status(201).send({ like });
};

// ---------------- Delete Like ----------------
export const deleteLikeHandler: ExpressHandler<deleteLikeRequest, deleteLikeResponse> = async (
    req,
    res
) => {
    const { postId, userId } = req.body;
    if (!postId || !userId) {
        return res.status(400).send({ message: 'postId and userId are required' });
    }

    const alreadyLiked = await Datastore.userLiked(userId, postId);
    if (!alreadyLiked) {
        return res.status(404).send({ message: 'Like not found' });
    }

    await Datastore.deleteLike(userId, postId);
    res.send({});
};

// ---------------- List Likes ----------------
export const listLikeHandler: ExpressHandler<listLikeRequest, listLikeResponse> = async (
    req,
    res
) => {
    const { postId } = req.query;
    if (!postId || typeof postId !== 'string') {
        return res.status(400).send({ message: 'postId is required' });
    }

    const likes = await Datastore.listLikes(postId);
    const count = await Datastore.countLikes(postId);

    res.send({ likes, count });
};
