import express, { RequestHandler } from 'express';
const app = express();
app.use(express.json());
const RequestLoggerMiddleware: RequestHandler =(req, res, next) => {
    console.log('new request made:', req.path, '__body:', req.body);
    next();
}
app.use(RequestLoggerMiddleware);
app.use((req, res, next) => {
    console.log(Date.now());
});
const posts : any [] = [];
app.get('/posts', (req, res) => {
    res.send( {posts} );
    
});
app.post('/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    res.sendStatus(200);
});
app.listen(3000);