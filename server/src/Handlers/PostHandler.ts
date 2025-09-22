import { 
    CreatePostRequest, 
    CreatePostResponse, 
    ListPostsRequest, 
    ListPostsResponse 
} from '@api';
import { db } from '@datastore';
import { ExpressHandler, Post } from '@types';
import crypto from 'crypto';

// ---------------- List Posts ----------------
export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
    request,
    response
) => {
    const posts = await db.listPosts();
    response.status(200).json({ posts });
};

// ---------------- Create Post ----------------
export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
    request,
    response
) => {
    const { title, userId, url } = request.body;

    //  Validate required fields
    if (!title || !userId || !url) {
        return response.status(400).json({ error: 'title, url, and userId are required' });
    }

    //  Validate user exists
    const user = await db.getUserById(userId);
    if (!user) {
        return response.status(404).json({ error: 'User not found' });
    }

    //  Validate title & url are not empty
    if (title.trim() === '' || url.trim() === '') {
        return response.status(400).json({ error: 'Title and URL cannot be empty' });
    }

    // Validate URL format (simple check)
    try {
        new URL(url);
    } catch {
        return response.status(400).json({ error: 'Invalid URL format' });
    }

    // Check if post with same URL exists
    const existing = await db.getPostByUrl(url);
    if (existing) {
        // Instead of creating a new post, just return the existing one
        return response.status(200).json({ post: existing });
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: title.trim(),
        url: url.trim(),
        userId,
    };

    await db.createPost(post);

    return response.status(201).json({ post });
};
