import express, { RequestHandler } from 'express';
import { db } from '../datastore/index.js';
const app = express();
app.use(express.json());
const RequestLoggerMiddleware: RequestHandler =(req, res, next) => {
    console.log(req.method , req.path, '__body:', req.body);
    next();
}
app.use(RequestLoggerMiddleware);
app.get('/posts', (req, res) => {
    res.send( {posts : db.listPosts()} );
    
});
app.post('/posts', (req, res) => {
    const post = req.body;
    db.createPost(post);
    res.sendStatus(200);
});
app.listen(3000);