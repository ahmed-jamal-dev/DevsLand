
import express, { RequestHandler, ErrorRequestHandler } from 'express';
import { createPostHandler, listPostHandler } from '@handlers';

const app = express();

app.use(express.json());
const RequestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '__body:', req.body);
    next();
};
app.use(RequestLoggerMiddleware);

app.get('/v1/posts', listPostHandler);

app.post('/v1/posts', createPostHandler);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Uncaught exception:', err);
    return res.status(500).send('0ops! Something went wrong , please try again.');
};
app.use(errorHandler);
app.listen(3000);
