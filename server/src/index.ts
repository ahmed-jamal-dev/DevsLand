import express, { RequestHandler, ErrorRequestHandler } from 'express';
import { createPostHandler, listPostHandler } from '@handlers';
import { initdb } from '@datastore';
import { signInHandler, signUpHandler } from './Handlers/userHandler';
import { createCommentHandler, deleteCommentHandler, listCommentHandler } from './Handlers/commentHandler';

(async () =>{
await initdb();
const app = express();
app.use(express.json());
const RequestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '__body:', req.body );
    next();
};
// app.use(RequestLoggerMiddleware);
//POST
app.get('/v1/listPost', listPostHandler);
app.post('/v1/createPost', createPostHandler);
//USER
app.post('/v1/signup', signUpHandler);
app.post('/v1/signin', signInHandler);
//COMMENTS
app.post('/v1/addcomment', createCommentHandler)
app.get('/v1/listcomment',listCommentHandler)
app.get('/v1/deletecomment',deleteCommentHandler)



const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Uncaught exception:', err);
    return res.status(500).send('0ops! Something went wrong , please try again.');
};
app.use(errorHandler);
app.listen(
    3000,
    async() => {
        console.log('Server is running on port 3000');
    }
);
})();