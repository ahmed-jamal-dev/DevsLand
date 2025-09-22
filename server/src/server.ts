import express from 'express';
import { createPostHandler, listPostHandler } from '@handlers';

import { signInHandler, signUpHandler } from '@/Handlers/authHandler';
import {
    createCommentHandler,
    deleteCommentHandler,
    listCommentHandler,
} from '@/Handlers/commentHandler';
import { RequestLoggerMiddleware } from './middleware/loggerMeddleware';
import { errorHandler } from './middleware/errorMeddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import { createLikeHandler, deleteLikeHandler, listLikeHandler } from './Handlers/likesHandler';
import { initdb } from '@datastore';

(async () => {
    await initdb();
    dotenv.config();
    const app = express();
    app.use(express.json());
    app.use(RequestLoggerMiddleware);
    //Public endpoints
    //USER
    app.post('/v1/signup', signUpHandler);
    app.post('/v1/signin', signInHandler);
    app.use(authMiddleware);
    //Private endpoints
    //POST
    app.get('/v1/listPost', listPostHandler);
    app.post('/v1/createPost', createPostHandler);

    //COMMENTS
    app.post('/v1/addcomment', createCommentHandler);
    app.get('/v1/listcomment', listCommentHandler);
    app.delete('/v1/deletecomment', deleteCommentHandler);

//LIKES
    // Create Like
app.post('/v1/creatlike', createLikeHandler);

// Delete Like
app.delete('/v1/deletelike', deleteLikeHandler);

// List Likes for a Post
app.get('/v1/listlikes', listLikeHandler);

    app.use(errorHandler);
    app.listen(3000, async () => {
        console.log('Server is running on port 3000');
    });
})();
